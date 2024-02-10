import './DbManagRight.scss';
import Select from '../../../../../base/builtIn/Select/Select.jsx';
import useAdminSection from '../../../../../hooks/useAdminSection.js';
import Filter_ from '../../../../../base/utils/Filter_.js';
import InfoIcon from '../../../../svg/Info/Info.jsx';



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
            <div
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
                        
                        onChange( id ) {
                            if (this.all.length === 0)
                                return null;
                            
                            id = `${id}`;
                            
                            var newEntry = (
                                this.all.find(e => (
                                    `${e.id}` === id
                                ))
                                || null
                            )

                            setTimeout(() => (
                                adminSection.setValue("chosenEntries", (prev) => {
                                    if (prev.includes( newEntry ))
                                        return prev;

                                    return (
                                        [...prev, newEntry]
                                    )
                                })
                            ), 0)
                            
                            return (
                                
                                newEntry

                            )
                            
                        },

                        disabled() {

                            return (
                                this.all.length === 0
                            );

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
            </div>
            
            
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
                                        .map(e => {
                                            var title = e[ adminSection.currentEntryKey ];
                                            var type = typeof title;

                                            ( title === undefined ) && ( title ||= e?.id );
                                            
                                            title = (
                                                ( title === undefined )
                                                ? ( "undefined" )
                                                : (
                                                    JSON.stringify(title, (_, v) => {
                                                        if (typeof v === 'function') {
                                                            return v.toLocaleString();
                                                        }
                                                        return v;
                                                    }, 2)
                                                )
                                            );
                                            
                                            return {
                                                title: title?.toString(),
                                                type,
                                                value: e,
                                            }
                                        }
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
