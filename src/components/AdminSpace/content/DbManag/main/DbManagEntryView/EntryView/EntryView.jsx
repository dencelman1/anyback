import { useEffect, useRef } from "react";
import { Button } from "../../../../../../../base/builtIn/index.js";
import Function_ from "../../../../../../../base/utils/Function_.js";
import useAdminSection from "../../../../../../../hooks/useAdminSection.js";
import './EntryView.scss';
import { getColorByDataType } from "../../../../../../../base/components/TabWidgetPanel/TabWidgetPanel.jsx";
import { allowedEntryDataTypes } from "../../../../../../../config.js";



export var filterEntryF = (e, entry) => (
    e.id === entry.id &&
    e.databaseName === entry.databaseName &&
    e.tableName === entry.tableName
)

var EntryView = ({
    entry,
    ...props
}) => {

    var adminSection = useAdminSection()
    var formRef = useRef(null);

    var reset = () => {
        Object.entries(entry)
        .filter(([_, v]) => allowedEntryDataTypes().includes( v ))
        .forEach(([key, prevValue]) => {
            var type = typeof prevValue;

            formRef.current.elements[key][
                type === 'boolean' ? "checked": 'value'
            ] = entry[key]
        })
    }

    var findNewValue = ( entry_ ) => {
        
        
        var newValue, type;
        var value = {};

        Object.entries( entry_ || entry )

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

        return ( value );
    }

    
    
    function editEntry (entry, value) {
        Object.assign(entry, value);

        adminSection.setValue("entries", (p) => [...p]);
        adminSection.setValue("chosenEntries", (p) => [...p]);
        
        adminSection.adminPanel.setCurrent(p => ({...p, entry }));
    }

    function deleteEntry ( entry ) {
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

    var onOnceUpdate = () => {
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
                        .map(([k, v], eI) => {
                            var type = typeof v;
                            var typeColor = getColorByDataType( type );
                            var allowedTypes;
                            
                            if (!( (allowedTypes = allowedEntryDataTypes()).includes( type ) )) {
                                var message = () => (
                                    `Can work with only:\n\n- ${allowedTypes.join(",\n- ")}\n\nnot: ${type}`
                                );

                                return (
                                    <p
                                        title={message()}
                                        onClick={() => window.alert(message())}
                                        style={{
                                            outline: '1px solid red',
                                            padding: '10px',
                                            borderRadius: '1px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {k}: {`${v}`}
                                    </p>
                                )
                            }

                            return (
                                <label
                                    htmlFor={k}
                                    key={eI}
                                    style={{
                                        color: typeColor,
                                    }}
                                >
                                    <span
                                        className={(
                                            "fieldName"+
                                            (adminSection.currentEntryKey === k ? " current": "")
                                        )}
                                        onClick={() => {
                                            adminSection.setValue("currentEntryKey", k)
                                        }}
                                        style={{
                                            marginTop: k === 'id' ? "20px": ''
                                        }}
                                    >{k}{k === 'id' ?`: ${v}`:""}</span>

                                    <input
                                        spellCheck={false}
                                        
                                        name={k}
                                        placeholder={k}
                                        type={{
                                            "number": "number",
                                            "string": 'text',
                                            "boolean": 'checkbox',
                                        }[type]}
                                        defaultValue={v}
                                        readOnly={k === 'id'}
                                        
                                        style={{
                                            display: k === 'id' ? 'none': '',
                                            color: typeColor,
                                        }}
                                    />
                                </label>

                            )

                        })
                    }
                </form>

            </div>

            <div
                className="edit buttons default-scroll-bar column "
            >

                <Button
                    onClick={() => {

                        onOnceUpdate();

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
                                window.alert(
                                    result
                                    ? `Entry with id = ${entry.id} was deleted successfull`
                                    : "Error while deleting this entry"
                                )

                                if ( result ) {
                                    deleteEntry( entry );
                                }

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
                        var getWithoutId = (entry) => {
                            var v = JSON.parse(JSON.stringify(entry));
                            delete v.id
                            
                            return ( v );
                        }
                        var defineNewValue = (fromEntry, toEntry) => {
                            var value = {};

                            Object.entries( fromEntry )
                            .forEach(([k, v]) => {
                                if (fromEntry[k] !== toEntry[k]) {
                                    value[k] = v;
                                }
                                
                            });

                            return value;
                        }

                        var delay = ( adminSection.options.border.reqDelayMs ),
                            intervalId,
                            proms = [],
                            count = 0,

                            value = getWithoutId( entry ),
                            editEntries = adminSection.chosenEntries.filter(e => e.id);

                        
                        if (editEntries.length === 1) {
                            return (
                                onOnceUpdate()
                            );
                        }

                        editEntries = (
                            editEntries
                            .filter(e => (
                                Object.keys( defineNewValue(value, getWithoutId( e )) ).length > 0
                            ))
                        );
                        
                        if (editEntries.length === 0) {
                            return (
                                window.alert("Nothing was changed in this entry from you for all other")
                            )
                        }

                        value = (
                            
                            editEntries
                            .map(( e ) => (
                                defineNewValue(value, getWithoutId( e ))
                            ))

                        );
                        
                        var update = (chosenEntry, value) => new Promise((res, rej) => (
                                    
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

                                rej,

                            )

                        ))

                        
                        var onUpdated = () => {

                            Promise.all(proms)
                            .then(( results ) => {

                                window.alert(
                                    `Was updated ${ results.filter(r => r).length } / `+
                                    `${ results.length }`+
                                    ` entries successfully`
                                )
                                
                            })

                        }

                        var editNotify = () => (
                            window.alert(
                                `Procesing.. Wait ~ `+
                                `${((( delay / 1000 ) * editEntries.length) - count).toFixed(0)}`
                            )
                        )
                        
                        intervalId = setInterval(() => {
                            if (proms.length >= editEntries.length) {
                                onUpdated();
                                
                                return ( clearInterval(intervalId) )
                            }

                            editNotify();
                            proms.push( update( editEntries[ count ], value[ count ] ) );
                            
                            count += 1;

                        }, delay)
                        
                    }}
                >
                    Update all
                </Button>

                <Button
                    onClick={() => {
                        
                        var deleteEntries = 
                            adminSection.setValue(
                                "chosenEntries",
                                adminSection.chosenEntries.filter(e => e.id)
                            ),

                            count = 0,
                            delay = adminSection.options.border.reqDelayMs,
                            proms = [],
                            intervalId;

                        if (deleteEntries.length === 0) {
                            return
                        }

                        var delete_ = (chosenEntry) => new Promise((res, rej) => (
                                    
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
                                        deleteEntry( chosenEntry );
                                    }
                                        
                                    res(result)
                                },
                                rej,

                            )

                        ))

                        var onDeleted = () => {

                            Promise.all(proms)
                            .then(( results ) => {
                                window.alert(
                                    `Was deleted ${results.filter(r => r).length} / ${results.length} entries successfully`
                                )
                            })

                        }

                        var editNotify = () => (
                            window.alert(
                                `Procesing.. Wait ~ `+
                                `${((( delay / 1000 ) * deleteEntries.length) - count).toFixed(0)}`
                            )
                        )
                        
                        editNotify();
                        
                        intervalId = setInterval(() => {
                            if (proms.length >= deleteEntries.length) {
                                onDeleted();
                                
                                return ( clearInterval(intervalId) )
                            }

                            proms.push( delete_( deleteEntries[ count++ ] ) );
                            editNotify();

                        }, delay)

                    }}
                >
                    Delete all
                </Button>
                    
                
            </div>

        </div>
    )
}

export default EntryView;
