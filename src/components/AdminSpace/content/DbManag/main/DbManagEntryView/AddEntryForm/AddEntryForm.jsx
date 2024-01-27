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
                    <div
                        style={{
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: "10px",
                        }}
                    >

                        <Button
                            type="submit"
                            onClick={() => {

                                var newEntry = {}, value;
                                
                                currentTable.fields.forEach(f => {
                                    value = formRef.current.elements[f.name][
                                        f.type === 'boolean' ? "checked": 'value'
                                    ]
                                    
                                    if (f.type === 'number')
                                        value = parseFloat(value)

                                    newEntry [f.name] = value
                                })

                                Function_.resolve(
                                    adminSection.options.create(
                                        currentDatabase.name,
                                        currentTable.name,

                                        newEntry,
                                    ),

                                    ( result ) => {
                                        
                                        window.alert(
                                            result
                                            ? "Entry was created"
                                            : "Error in entry creating"
                                        )

                                        adminPanel.setCurrent(p => {
                                            
                                            setTimeout(() => {
                                                adminSection.setValue("chosenEntries", (prev) => (

                                                    prev.filter(e => e !== p.entry)
                                                    
                                                ))
                                            }, 0)

                                            return {
                                                ...p,
                                                entry: null,
                                            };
                                        })

                                    },
                                )
                            }}
                        >
                            Create
                        </Button>


                    </div>

                </>)
            }
        </form>
    )
}

export default AddEntryForm;
