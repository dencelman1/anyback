import { useEffect, useMemo } from 'react';
import { Input } from '../../../../../base/builtIn';
import './DbManagRight.scss';
import { useAdminPanel } from '../../../../../hooks/useAdminPanel';
import Select from '../../../../../base/builtIn/Select/Select';
import useAdminSection from '../../../../../hooks/useAdminSection';



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
                                ) || "Unknown"
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
                                        isRightStateValue(event.target.value)
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
                        .map(d => (
                            <Select
                                title={d.name}
                                
                                options={d.tables.map(t => (
                                    <Select
                                        title={t.name}
                                        options={
                                            entries
                                            // .filter(e => (
                                            //     e.prototype.name === t.name
                                            //     &&
                                            //     e.prototype.prototype.name === t.name
                                            // ))

                                            // TODO: filtering
                                            .map(e => ({
                                                title: e[adminSection.currentEntryKey],
                                                value: e,
                                            })
                                        )}
                                        onOpen={() => {
                                            // TODO: load entries
                                            console.log("opened")
                                        }}
                                        onClose={() => {
                                            console.log("closed")
                                        }}
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
                                                    // TODO: database + table names from entry prototype or data

                                                    entry: newValue,
                                                }
                                            })                                

                                        }}
                                    />
                                ))}
                            />
                        ))

                    }
                />
            }

        </div>
    )
}

export default DbManagRight;
