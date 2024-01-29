import { useEffect, useMemo } from 'react';
import { Input } from '../../../../../base/builtIn';
import './DbManagRight.scss';
import { useAdminPanel } from '../../../../../hooks/useAdminPanel';
import Select from '../../../../../base/builtIn/Select/Select';
import useAdminSection from '../../../../../hooks/useAdminSection';
import Function_ from '../../../../../base/utils/Function_';



var DbManagRight = () => {
    var adminPanel = useAdminPanel()
    var adminSection = useAdminSection()

    var navInputQueries = useMemo(() => ({
        style: {
            marginBottom: '10px',
            height: "30px",
            lineHeight: '30px',
            fontSize: '20px',
        },
        disabled: true,
    }), [])

    useEffect(() => {
        
    }, [])

    var databases = (adminSection.databases || []),
        entries = (adminSection.entries || []);


    function isRightValue(
        currentStateName,
        newValue
    )  {

        return (
            newValue === "MY_DATABASE"
        );

    }

    function updateEntries (
        dbName,
        tableName,
        
    ) {
        var entryProto = {
            tableName,
            databaseName: dbName,
        }

        Function_.resolve(
            adminSection.options.read(
                dbName,
                tableName,

                // TODO:
                adminSection.offset, // offset,
                adminSection.limit, // limit,

            ),
            ( entries ) => {

                if (typeof entries === "string") {
                    return (
                        window.alert(entries)
                    )
                }

                if (! ( Array.isArray(entries) )) {
                    return (
                        window.alert(
                            `Error of loading ${d.name} -> ${t.name} entries`
                        )
                    )

                }
                
                entries = entries.map(e => {
                    Object.setPrototypeOf(e, entryProto);
                    return e
                })
                
                adminSection.setValue(
                    "entries",
                    (prev) => {
                        return (
                            prev.concat(
                                entries
                                .filter(e => !( prev.includes(e) ))
                            )
                        )
                    }
                )
            },
        )
    }

    return (
        <div
            className="DbManagMain__right"
        >
            <p
                className="navInputs"
            >
                {[
                    {
                        placeholder: 'Database',
                        currentStateName: "databaseName",
                    },
                    {
                        placeholder: 'Table',
                        currentStateName: "tableName",
                    },
                    {
                        placeholder: 'Entry',
                        currentStateName: "entry",
                    },
                ].map(data => {
                    var currentStateName = data.currentStateName
                    var isRightStateValue = (value) => isRightValue(currentStateName, value)
                    return (
                        <Input
                            {...data}
                            value={
                                (
                                    currentStateName === 'entry'
                                    ? (adminPanel.current?.[currentStateName]?.[adminSection.currentEntryKey])
                                    : (adminPanel.current[currentStateName])
                                )
                                || ( data.placeholder )
                            }
                            
                            onChange={(event) => {
                                return (
                                    adminPanel.setCurrent(p => ({
                                        ...p,
                                        [currentStateName]: event.target.value}
                                    ))
                                )
                            }}
                            onBlur={(event) => {
                                adminPanel.setCurrent(p => ({
                                    ...p,
                                    [currentStateName]:
                                        isRightStateValue( event.target.value )
                                        ? event.target.value
                                        : (""),
                                }))

                            }}
                            onKeyDown={(event) => {
                                if ( event.key !== "Enter" ) {
                                    return
                                }

                                adminPanel.setCurrent(p => ({
                                    ...p,
                                    [currentStateName]:
                                        isRightStateValue(event.target.value)
                                        ? event.target.value
                                        : (""),
                                }))
                                

                                
                            }}
                            
                            {...navInputQueries}
                        />
                    )

                })}
            </p>
            
            {
                <Select
                    title="Data"
                    options={
                        databases
                        .map(d => {
                            
                            var onCloseOpen = (callback) => {
                                adminPanel.setCurrent(p => {
                                    if (p.entry?.id)
                                        return p;
                                    
                                    return callback(p)
                                })
                            }

                            var onDbCloseOpen = () => onCloseOpen(p => ({...p, databaseName: d.name}));
                                
                            return <Select
                                title={d.name}
                                
                                onOpen={onDbCloseOpen}
                                onClose={onDbCloseOpen}
                                
                                options={d.tables.map(t => {

                                    var onTableCloseOpen = () => onCloseOpen(p => ({...p, tableName: t.name}))    
                                    
                                    return <Select
                                        title={t.name}
                                        options={
                                            entries
                                            .filter(e => (
                                                e.tableName === t.name
                                                &&
                                                e.databaseName === d.name
                                            ))
                                            .map(e => ({
                                                title: e[ adminSection.currentEntryKey ],
                                                value: e,
                                            })
                                        )}

                                        onOpen={() => {
                                            onTableCloseOpen();
                                            updateEntries(d.name, t.name);
                                        }}
                                        onClose={onTableCloseOpen}

                                        isSelect={(option) => (
                                            adminPanel.current.entry === option.value
                                        )}
                                        onChange={(option) => {

                                            var newValue = option.value
                                            adminSection.setValue("chosenEntries", (prev) => {
                                                if (prev.includes(newValue))
                                                    return prev

                                                return [...prev, newValue]
                                            })

                                            adminPanel.setCurrent((p) => {
                                                if (p.entry === newValue)
                                                    return p

                                                return {
                                                    ...p,
                                                    databaseName: d.name,
                                                    tableName: t.name,
                                                    entry: newValue,
                                                }
                                            })                                

                                        }}
                                    />
                                })}
                            />
                        })

                    }
                />
            }

        </div>
    )
}

export default DbManagRight;
