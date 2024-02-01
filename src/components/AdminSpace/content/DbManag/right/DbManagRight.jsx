import { useEffect, useMemo } from 'react';
import { Input } from '../../../../../base/builtIn';
import './DbManagRight.scss';
import { useAdminPanel } from '../../../../../hooks/useAdminPanel';
import Select from '../../../../../base/builtIn/Select/Select';
import useAdminSection from '../../../../../hooks/useAdminSection';
import Filter_ from '../../../../../base/utils/Filter_';



var DbManagRight = () => {
    var adminSection = useAdminSection()
    var adminPanel = adminSection.adminPanel;

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
                ].map(( data , index ) => {
                    var currentStateName = data.currentStateName

                    var isRightStateValue = (value) => isRightValue(currentStateName, value)
                    return (
                        <Input
                            placeholder={data.placeholder}

                            key={index}

                            value={
                                (
                                    currentStateName === 'entry'
                                    ? (
                                        adminPanel.current?.[currentStateName]?.id?.toString()
                                    )
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
            
            
            <Select
                title="Data"
                className="dataSelect default-scroll-bar column "

                options={
                    databases
                    .map(( d, dI ) => {
                        
                        var onCloseOpen = (callback) => (

                            adminPanel.setCurrent(p => (
                                ( p.entry?.id )
                                ? ( p )
                                : ( callback( p ) )
                            ))

                        );

                        var onDbCloseOpen = () => (
                            onCloseOpen(p => ({...p, databaseName: d.name}))
                        );
                            
                        return <Select
                            key={dI}
                            title={d.name}
                            
                            onOpen={onDbCloseOpen}
                            onClose={onDbCloseOpen}
                            
                            options={d.tables.map(( t , tI ) => {

                                var onTableCloseOpen = () => onCloseOpen(p => ({...p, tableName: t.name}))    
                                
                                return <Select
                                    key={tI}
                                    title={t.name}
                                    onContextMenu={(event) => {
                                        event.preventDefault();

                                        adminSection.setValue("entries", (prev) => {
                                            var filterF = (e) => (
                                                e.databaseName === d.name &&
                                                e.tableName === t.name
                                            )
                                            var key = adminSection.currentEntryKey;
                                            
                                            return (
                                                prev
                                                .filter(e => !(
                                                    filterF(e)
                                                ))
                                                .concat(
                                                    Filter_.list(
                                                        prev.filter(filterF), key,
                                                    )
                                                )

                                            )
                                        })
                                    }}
                                    
                                    options={
                                        entries
                                        .filter(e => (
                                            e.tableName === t.name
                                            &&
                                            e.databaseName === d.name
                                        ))
                                        .map(e => ({
                                            title: e[ adminSection.currentEntryKey ]?.toString() || e.id?.toString(),
                                            value: e,
                                        })
                                    )}

                                    onOpen={() => {
                                        onTableCloseOpen();
                                        adminSection.updateEntries(d.name, t.name);
                                    }}
                                    onClose={onTableCloseOpen}

                                    isSelect={(option) => (
                                        adminPanel.current.entry === option.value
                                    )}
                                    onChange={(option) => {

                                        var newValue = option.value
                                        adminSection.setValue("chosenEntries", (prev) => {
                                            if (prev.includes(newValue)) {
                                                return ( prev );
                                            }

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
            
        </div>
    )
}

export default DbManagRight;
