import { useMemo, useRef } from "react";
import { Button, FormInput, Input } from "../../../../../../../base/builtIn";
import { useAdminPanel } from "../../../../../../../hooks/useAdminPanel";
import useAdminSection from "../../../../../../../hooks/useAdminSection";
import './AddEntryForm.scss';
import Function_ from "../../../../../../../base/utils/Function_";


var AddEntryForm = (
    props,
) => {
    var adminPanel = useAdminPanel();
    var adminSection = useAdminSection();

    var formRef = useRef(null);
    var creatingCountRef = useRef(null)

    if (!( adminSection.databases ))
        return null

    var currentDatabase = useMemo(() =>
        adminSection.databases
            .filter(d => d.name === adminPanel.current.databaseName)
            [0]
        ,
        [adminPanel.sections, adminPanel.current]
    )
    var currentTable = useMemo(() =>
        currentDatabase
        ? (
            currentDatabase.tables
            .filter(t => t.name === adminPanel.current.tableName)
            [0]
        )
        : null,
        [adminPanel.sections, adminPanel.current]
    )

    
    
    var defaultTypeValues = () => ({
        'boolean': false,
        "number": 0,
        "string": "",
    })
    
    return (
        <form
            {...props}
            className={(
                "AddEntryForm defaultFormInputElements"+
                (props.className ? ` ${props.className}`: "")
            )}
            onSubmit={(event) => {
                event.preventDefault();
                return false

            }}
            ref={formRef}
        >
            <select
                defaultValue={adminPanel.current.databaseName || "Unknown"}
                onChange={(e) =>
                
                    adminPanel.setCurrent(p => ({
                        ...p,
                        databaseName: ( e.target.value === "Unknown" ? "" : e.target.value  ),
                        tableName: ( "" ),
                    }))
                
                }
            >
                <option
                    value="Unknown"
                >
                    Unknown
                </option>
                {
                    adminSection.databases.map((d) => (
                        <option
                            value={d.name}
                        >
                            {d.name}
                        </option>
                    ))
                }
            </select>
        
            
            <select
                defaultValue={adminPanel.current.tableName || "Unknown"}
                disabled={ ! currentDatabase }
                onChange={(e) => adminPanel.setCurrent(p => ({
                    ...p,
                    tableName: ( e.target.value === "Unknown" ? "" : e.target.value )
                }))}
            >
                <option
                    value="Unknown"
                >
                    Unknown
                </option>

                {
                    adminPanel.current.databaseName
                    && (
                        
                        currentDatabase
                        .tables
                        .map(t => (
                            <option
                                value={t.name}
                            >
                                {t.name}
                            </option>
                        ))
                        
                    )
                }
            </select>

            {
                currentTable
                && (<>
                    {
                        currentTable.fields
                        .map(f => {
                            if (! ( ["boolean", 'string', 'number'].includes(f.type) ))
                                return null;
                                                        
                            return (
                                <label
                                    htmlFor={f.name}
                                    
                                >
                                    <span>{f.name}</span>
                                    <input
                                        name={f.name}
                                        placeholder={f.name}
                                        type={{
                                            "number": "number",
                                            "string": 'text',
                                            "boolean": 'checkbox',
                                        }[f.type]}
                                        
                                        defaultValue={
                                            f.defaultValue === undefined
                                            ? ( defaultTypeValues()[f.type] )
                                            : f.defaultValue
                                        }
                                    />
                                </label>

                            )
                            
                        })
                    }
                    
                    <Button
                        type="submit"
                        onClick={() => {

                            var newEntry = {},
                                value,
                                intervalId,
                                proms = [],
                                creatingCount = ( creatingCountRef.current.value ),
                                delay = adminSection.options.defaultValue.reqDelayMs;
                            
                            currentTable.fields.forEach(f => {
                                value = formRef.current.elements[f.name][
                                    f.type === 'boolean' ? "checked": 'value'
                                ]
                                
                                if (f.type === 'number')
                                    value = parseFloat(value)

                                newEntry[f.name] = value
                            })

                            var create = () => new Promise((res, rej) => (
                                Function_.resolve(
                                    adminSection.options.create(
                                        currentDatabase.name,
                                        currentTable.name,

                                        newEntry,
                                    ),

                                    ( result ) => ( res( result ) ),
                                )
                            ))

                            var onCreated = () => {
                                adminPanel.setCurrent(p => (
                                    {
                                        ...p,
                                        entry: null,
                                    }
                                ));

                                adminSection.setValue("chosenEntries", (prev) => (
                                    prev.filter(e => e.id)
                                ))
                            }

                            window.alert(`Procesing.. Wait ~ ${(( delay / 1000 ) * creatingCount).toFixed(0)}sec`)

                            intervalId = setInterval(() => {
                                console.log(proms.length, creatingCount);

                                if (proms.length >= creatingCount) {

                                    Promise.all(proms)
                                    .then(( results ) => {

                                        window.alert(
                                            `Created ${results.filter(r => r).length} / ${creatingCount}`
                                        )

                                    })
                                    .finally(() => onCreated())
                                    
                                    return (
                                        clearInterval( intervalId )
                                    );
                                }

                                proms.push(create())
                            }, delay)

                        }}
                    >
                        Create
                    </Button>
                        
                    {(() => {

                        var maxValue = (adminSection.options.defaultValue.maxCreateManyEntry || 10),
                            currentValue;
                        return (
                            <label>
                                <span>* Creating number {"<="} {maxValue}</span>
                                <input
                                    type="number"
                                    className="creatingNumber"
                                    ref={creatingCountRef}
                                    min={1}
                                    defaultValue={1}
                                    
                                    onChange={(e) => {
                                        e.preventDefault();

                                        currentValue = e.target.value;

                                        if (currentValue === '') {
                                            return (e.target.value = 0);
                                        }

                                        if (
                                            ( parseFloat(currentValue) > maxValue ) ||
                                            !( /^-?[0-9]+$/.test(currentValue) )
                                        ) {
                                            e.target.value = maxValue;
                                        }
                                    }}
                                    maxLength={maxValue.toString().length}
                                    max={maxValue}
                                />                                
                            </label>
                            
                        )
                    })()}

                </>)
            }
        </form>
    )
}

export default AddEntryForm;
