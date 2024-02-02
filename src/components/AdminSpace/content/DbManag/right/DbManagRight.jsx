import { useEffect, useMemo } from 'react';
import { Input } from '../../../../../base/builtIn';
import './DbManagRight.scss';
import Select from '../../../../../base/builtIn/Select/Select';
import useAdminSection from '../../../../../hooks/useAdminSection';
import Filter_ from '../../../../../base/utils/Filter_';
import InfoIcon from '../../../../svg/Info/Info';



var DbManagRight = () => {
    var adminSection = useAdminSection()
    var adminPanel = adminSection.adminPanel;
    
    var databases = (adminSection.databases || []),
        entries = (adminSection.entries || []);

    var extraData = {
        databaseName: adminSection?.currentDatabase?.extra,
        tableName: adminSection?.currentTable?.extra,
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
                        currentStateName: "databaseName",
                        placeholder: 'Database',
                        defaultValue: "",

                        current: adminSection.currentDatabase,
                        all: ( adminSection.databases ),

                        value( e ) {
                            e ||= this.current;
                            return e?.name;
                        },
                        onChange: ( ( v ) => ( v ) ),

                        disabled: () => ( false ),

                    },
                    {
                        currentStateName: "tableName",
                        placeholder: 'Table',
                        defaultValue: "",

                        current: adminSection.currentTable,
                        all: ( adminSection.currentDatabase?.tables ),

                        value( e ) {
                            e ||= this.current;
                            return e?.name;
                        },
                        
                        onChange: ( ( v ) => ( v ) ),

                        disabled() {
                            return !( this.all )
                        },
                    },
                    {
                        currentStateName: "entry",
                        placeholder: 'Entry',
                        defaultValue: null,

                        current: adminPanel.current.entry,
                        all: ( adminSection.currentEntries( adminSection.entries ) ),

                        value( e ) {
                            e ||= adminPanel.current.entry;
                            return (
                                e?.id
                            );
                        },
                        
                        onChange: ( id ) => (
                            adminSection.entries?.find(e => (
                                e.databaseName === adminPanel.current.databaseName,
                                e.tableName === adminPanel.current.tableName,
                                e.id === id
                            ))
                            || null
                        ),

                        disabled() {
                            return (
                                !( this.current?.id )
                            )
                        }
                        
                        
                    },
                ].map(( data , index ) => {

                    var currentStateName = data.currentStateName;
                    var value = `${data.value() || 'unknown'}`;

                    
                    return (
                        <div
                            className='navBlock'
                        >
                            <select
                                key={ index }

                                disabled={data.disabled()}
                                value={value}
                                
                                onChange={(event) => {
                                    return (
                                        adminPanel.setCurrent(p => ({
                                            ...p,
                                            [currentStateName]: (
                                                event.target.value === 'unknown' 
                                                ? ( data.defaultValue )
                                                : ( data.onChange( event.target.value ) )
                                            )

                                        }))
                                    )
                                }}
                            >
                                <option value="unknown">
                                    {data.placeholder}
                                </option>

                                {
                                    data.all?.map(o => {
                                        
                                        var v = data.value( o );

                                        return (
                                            <option
                                                value={v}
                                            >
                                                {v}
                                            </option>)
                                    })
                                }
                            </select>

                            {
                                (
                                    data.currentStateName !== 'entry' &&
                                    extraData[data.currentStateName]
                                )
                                && (
                                    <InfoIcon
                                        side="30px"
                                        onClick={() => {
                                            
                                            window.alert(
                                                extraData[data.currentStateName]
                                            )
                                            
                                        }}
                                    />
                                )
                            }
                            
                        </div>
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
                            title={ d.name }
                            
                            onOpen={onDbCloseOpen}
                            onClose={onDbCloseOpen}
                            
                            options={d.tables.map(( t , tI ) => {

                                var onTableCloseOpen = () => onCloseOpen(p => ({...p, tableName: t.name}))    
                                
                                return <Select
                                    key={tI}
                                    title={ t.name }
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
