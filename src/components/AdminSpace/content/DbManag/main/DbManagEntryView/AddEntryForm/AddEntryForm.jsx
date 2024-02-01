import { useRef } from "react";
import { Button } from "../../../../../../../base/builtIn";

import useAdminSection from "../../../../../../../hooks/useAdminSection";
import './AddEntryForm.scss';
import Function_ from "../../../../../../../base/utils/Function_";
import { getColorByDataType } from "../../../../../../../base/components/TabWidgetPanel/TabWidgetPanel";


var AddEntryForm = (
    props,
) => {
    
    var adminSection = useAdminSection();
    var adminPanel = adminSection.adminPanel;

    var formRef = useRef(null);
    var creatingCountRef = useRef(null)

    if (!( adminSection.databases ))
        return null

    var currentDatabase = adminSection.currentDatabase,
        currentTable = adminSection.currentTable;

    
    
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
                value={adminPanel.current.databaseName || "Unknown"}
                onChange={(e) =>
                
                    adminPanel.setCurrent(p => ({
                        ...p,
                        databaseName: ( e.target.value === "Unknown" ? "" : e.target.value  ),
                        tableName: ( "" ),
                    }))
                
                }
            >
                <option
                    key={-1}
                    value="Unknown"
                >
                    Unknown
                </option>
                {
                    adminSection.databases.map((d, dI) => (

                        <option
                            key={dI}
                            value={d.name}
                        >
                            {d.name}
                        </option>
                    ))
                }
            </select>
        
            
            <select
                value={
                    currentDatabase
                    ? (adminPanel.current.tableName || "Unknown")
                    : ("Unknown")
                }
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
                    currentDatabase
                    && (
                        
                        currentDatabase
                        .tables
                        .map((t, tI) => (
                            <option
                                key={tI}
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
                        .map((f, fI) => {
                            if (! ( ["boolean", 'string', 'number'].includes(f.type) ))
                                return null;
                                                        
                            return (
                                <label
                                    key={fI}
                                    htmlFor={f.name}
                                    style={{
                                        color: getColorByDataType(f.type)
                                    }}
                                >
                                    <span
                                        className={(
                                            "fieldName"+
                                            (adminSection.currentEntryKey === f.name ? " current": "")
                                        )}
                                        onClick={() => {
                                            adminSection.setValue("currentEntryKey", f.name)
                                        }}
                                    >
                                        {f.name}
                                    </span>
                                    <input
                                        spellCheck={false}
                                        name={f.name}
                                        placeholder={f.name}
                                        type={{
                                            "number": "number",
                                            "string": 'text',
                                            "boolean": 'checkbox',
                                        }[f.type]}
                                        style={{
                                            color: getColorByDataType(f.type)
                                        }}
                                        
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
                                delay = adminSection.options.border.reqDelayMs;
                            
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
                                    prev.filter( ( e ) => ( e.id ) )
                                ))
                            }

                            window.alert(`Procesing.. Wait ~ ${(( delay / 1000 ) * creatingCount).toFixed(0)}sec`)

                            intervalId = setInterval(() => {
                                
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

                                proms.push( create() )
                            }, delay)

                        }}
                    >
                        Create
                    </Button>
                        
                    {(() => {

                        var maxValue = (adminSection.options.border.maxCreateManyEntry),
                            currentValue;

                        var getNullValues = () => ( ["", "0"] )
                        return (

                            <label>
                                <span>* Creating number {"<="} {maxValue}</span>
                                <input
                                    spellCheck={false}
                                    type="number"
                                    className="creatingNumber"
                                    ref={creatingCountRef}
                                    style={{
                                        color: getColorByDataType('number')
                                    }}

                                    min={1}
                                    defaultValue={1}
                                    
                                    onChange={(e) => {
                                        e.preventDefault();

                                        e.target.value = (
                                            currentValue = e.target.value.replace(/^0+/, '')
                                        );

                                        if (( getNullValues() ).includes(currentValue)) {
                                            return (e.target.value = 0);
                                        }
                                        
                                        if (
                                            ( parseFloat(currentValue) > maxValue ) ||
                                            !( /^-?[0-9]+$/.test(currentValue) )
                                        ) {
                                            e.target.value = maxValue;
                                        }

                                    }}
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
