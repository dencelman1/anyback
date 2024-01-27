import { useEffect, useMemo, useRef } from "react";
import { Button } from "../../../../../../../base/builtIn";
import Function_ from "../../../../../../../base/utils/Function_";
import { useAdminPanel } from "../../../../../../../hooks/useAdminPanel";
import useAdminSection from "../../../../../../../hooks/useAdminSection";
import './EntryView.scss';


var EntryView = ({
    entry,
    ...props
}) => {

    var adminSection = useAdminSection()
    var formRef = useRef(null);

    var reset = () => {
        Object.entries(entry)
        .forEach(([key, prevValue]) => {
            var type = typeof prevValue;

            formRef.current.elements[key][
                type === 'boolean' ? "checked": 'value'
            ] = entry[key]
        })
    }

    var findNewValue = () => {
        var newValue, type;
        var value = {};

        Object.entries(entry)
        .forEach(([key, prevValue]) => {
            type = typeof prevValue;

            newValue = formRef.current.elements[key][
                type === 'boolean' ? "checked": 'value'
            ]
            
            if (type === 'number') {
                newValue = parseFloat(newValue || "0")
            }

            if (newValue !== prevValue && key !== 'id') {
                value[key] = newValue;
            }
        })
        return value;

    }

    var filterEntryF = (e, entry) => (
        e.id === entry.id &&
        e.databaseName === entry.databaseName &&
        e.tableName === entry.tableName
    )
    
    // TODO: crud states entries to useAdminSection
    function editEntry (entry, value) {
        var updatedEntry = {
            ...entry,
            ...value,
        }
        
        Object.setPrototypeOf(updatedEntry, Object.getPrototypeOf(entry));

        var filterF = (e) => filterEntryF(e, entry)

        adminSection.setValue("entries", (p) => p.map(e => ( filterF(e) ? updatedEntry : e ) ));
        adminSection.setValue("chosenEntries", (p) => p.map(e => ( filterF(e) ? updatedEntry : e ) ));
        
        adminSection.adminPanel.setCurrent(p => ({...p, entry: updatedEntry}));
    }

    function deleteEntry (entry) {
        var filterF = (e) => filterEntryF(e, entry)
        
        adminSection.setValue("entries", (p) => p.filter((e) => !( filterF(e) )));
        adminSection.setValue("chosenEntries", (p) => p.filter((e) => !( filterF(e) ) ));
        
        adminSection.adminPanel.setCurrent(p => {
            return (
                (p.entry && filterF(p.entry)) 
                ? ({
                    ...p,
                    entry: null,
                })
                : p
            )
            
        })

    }

    useEffect(() => {
        reset()
    }, [entry])

    return (
        <div
            {...props}
            style={{
                ...(props.style || {}),
            }}
            className={(
                "EntryView defaultFormInputElements" +
                (props.className ? ` ${props.className}` : "")
            )}
        >
            <div className="edit fields">
            <form
                
                ref={formRef}
            >
                {
                    
                    Object.entries(entry)
                    .map(([k, v]) => {
                        var type = typeof v;

                        if (k === 'id') {
                            return (<>
                                <p>{k}: {v}</p>
                                <input
                                    name={k}
                                    value={v}
                                    style={{
                                        display: 'none',
                                    }}
                                />
                            </>)
                        }

                        return (
                            <label
                                htmlFor={k}
                            >
                                <span>{k}</span>
                                <input
                                    name={k}
                                    placeholder={k}
                                    type={{
                                        "number": "number",
                                        "string": 'text',
                                        "boolean": 'checkbox',
                                    }[type]}
                                    defaultValue={v}
                                />
                            </label>

                        )

                    })
                }
            </form>
            </div>

            <div
                className="edit buttons"
            >

                <Button
                    onClick={() => {

                        var value = findNewValue();

                        if (JSON.stringify(value) === "{}") {
                            return (
                                window.alert("Nothing was changed in this entry from you")
                            )
                        }

                        Function_.resolve(
                            adminSection.options.update(
                                entry.databaseName,
                                entry.tableName,

                                value,
                                {
                                    id: entry.id,
                                },
                            ),
                            ( result ) => {

                                window.alert(
                                    result
                                    ? `Was edited ${Object.entries(value).length} fields of this entry`
                                    : "Error while editing this entry"
                                )

                                if ( result ) {
                                    editEntry(entry, value);
                                }
                            },
                        )

                    }}
                >
                    Update
                </Button>

                <Button
                    onClick={() => {
                        
                        Function_.resolve(
                            adminSection.options.delete(
                                entry.databaseName,
                                entry.tableName,
                                {
                                    id: entry.id,
                                },
                            ),

                            ( result ) => {
                                if (result) {
                                    deleteEntry( entry );
                                }

                                window.alert(
                                    result
                                    ? `Entry with id = ${entry.id} was deleted successfull`
                                    : "Error while deleting this entry"
                                )
                                
                            },

                        )
                    }}
                >
                    Delete
                </Button>

                <Button
                    onClick={() => {
                        reset();
                    }}
                >
                    Reset
                </Button>

                <br />
                <Button
                    onClick={() => {
                        var value = findNewValue();

                        if (JSON.stringify(value) === "{}") {
                            return (
                                window.alert("Nothing was changed in this entry from you")
                            )
                        }

                        Function_.resolve(

                            adminSection.chosenEntries.map(chosenEntry => (
                                
                                new Promise((res, rej) => (
                                    
                                    Function_.resolve(

                                        adminSection.options.update(
                                            chosenEntry.databaseName,
                                            chosenEntry.tableName,

                                            value,
                                            {
                                                id: chosenEntry.id,
                                            },
                                        ),

                                        ( result ) => {
                                            if (result) {
                                                editEntry(chosenEntry, value);
                                            }
                                            
                                            res(result)
                                        },

                                    )
                                ))

                            )),

                            ( results ) => {
                                window.alert(
                                    `${Object.keys(value).length} fields was updated`+
                                    ` in ${results.filter(r => r).length} / `+
                                    `${adminSection.chosenEntries.length}`+
                                    ` entries successfully`
                                )
                            }
                        )

                        
                    }}
                >
                    Update all
                </Button>

                <Button
                    onClick={() => {
                        
                        Function_.resolve(

                            adminSection.chosenEntries.map(chosenEntry => (
                                
                                new Promise((res, rej) => (
                                    
                                    Function_.resolve(
                                        adminSection.options.delete(
                                            chosenEntry.databaseName,
                                            chosenEntry.tableName,
                                            {
                                                id: chosenEntry.id,
                                            },
                                        ),
                                        ( result ) => {
                                            if (result) {
                                                deleteEntry(chosenEntry);
                                            }
                                                
                                            res(result)
                                        },
                                        rej,
                                    )
                                ))

                            )),
                            
                            ( results ) => {
                                window.alert(`Was deleted ${results.filter(r => r).length} entries successfully`)
                            }
                        )

                    }}
                >
                    Delete all
                </Button>
                
            </div>

        </div>
    )
}

export default EntryView;
