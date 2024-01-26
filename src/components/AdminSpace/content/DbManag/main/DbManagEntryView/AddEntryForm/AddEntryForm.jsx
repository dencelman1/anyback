import { useRef } from "react";
import { Button, FormInput, Input } from "../../../../../../../base/builtIn";
import { useAdminPanel } from "../../../../../../../hooks/useAdminPanel";
import useAdminSection from "../../../../../../../hooks/useAdminSection";
import './AddEntryForm.scss';


var AddEntryForm = (
    props,
) => {
    var adminPanel = useAdminPanel();
    var adminSection = useAdminSection();
    var formRef = useRef(null);

    if (!( adminSection.databases ))
        return null

    var currentDatabase = (
        adminSection.databases
            .filter(d => d.name === adminPanel.current.databaseName)
            [0]
    )
    var currentTable = (
        currentDatabase &&
        currentDatabase.tables
            .filter(t => t.name === adminPanel.current.tableName)
            [0]
    )


    
    
    return (
        <form
            {...props}
            className={(
                "AddEntryForm"+
                (props.className ? ` ${props.className}`: "")
            )}
            onSubmit={(event) => {
                event.preventDefault();
                return false

            }}
            ref={formRef}
        >
            <select
                defaultValue="Unknown"
                onChange={(e) => adminPanel.setCurrent(p => ({
                    ...p,
                    databaseName: ( e.target.value === "Unknown" ? "" : e.target.value  ),
                    tableName: ( ""  )
                }))}
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
                defaultValue="Unknown"
                disabled={ adminPanel.current.databaseName === "" }
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
                            if (f.type === 'string' || f.type === "number") {

                                var defaultValue =
                                    f.defaultValue === undefined ? (
                                        
                                        f.type === 'number' ? 0: ''

                                    ) : f.defaultValue

                                return (
                                    <input
                                        label={f.name}
                                        name={f.name}

                                        defaultValue={defaultValue}
                                        type={f.type === 'number' ? f.type: "text"}

                                        maxLength={f.maxLength}
                                        minLength={f.minLength}
                                        
                                        minValue={f.minValue}
                                        maxValue={f.maxValue}
                                    />
                                )
                            }
                            if (f.type === "boolean") {
                                return (<>
                                    <label
                                        htmlFor={f.name}
                                    >
                                        <span>{f.name}</span>
                                        <input
                                            name={f.name}
                                            type="checkbox"
                                            defaultValue={f.defaultValue || false}
                                        />
                                    </label>

                                </>)
                            }

                            return null
                        })
                    }
                    <Button
                        type="submit"
                        onClick={() => {

                            console.log('submiting');
                            console.dir(formRef.current.elements)
                            var newEntry = {}
                            currentTable.fields.forEach(f => {

                                newEntry [f.name] =
                                    formRef.current.elements[f.name][
                                        f.type === 'boolean' ? "checked": 'value'
                                    ]

                            })

                            alert(JSON.stringify(newEntry))
                        }}
                    >
                        Create
                    </Button>
                </>)
            }
        </form>
    )
}

export default AddEntryForm;
