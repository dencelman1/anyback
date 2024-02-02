import {  useCallback, useMemo } from "react";
import { useAdminPanel } from "./useAdminPanel"
import Function_ from "../base/utils/Function_";
import CacheData from "../api/local/CacheData/CacheData";





var useAdminSection = () => {

    var adminPanel = useAdminPanel();
    var options = adminPanel.options;


    var cacheGet = (
        name,
        defaultValue
    ) => {
        defaultValue ||= options.defaultValue[name];

        var v = CacheData[name];
                        
        if ( v === undefined ) {
            CacheData[name] = (
                v = defaultValue
            );
        }

        return v;
    }
    
    var section = adminPanel.current.section;

    var getCurrentDatabase = ( databases ) => {
        return (
            (databases instanceof Object)
            ? (
                databases
                .filter(d => d.name === adminPanel.current.databaseName)
                [0]
            )
            : ( null )
        )
    }

    var getCurrentTable = ( currentDatabase ) => {
        return (
            (adminPanel.current.tableName && currentDatabase)
            ? (

                currentDatabase.tables
                .find(t => t.name === adminPanel.current.tableName)

            )
            : ( null )
        )
    }

    var currentDatabase = useMemo(() => (

        getCurrentDatabase( section.databases )

    ), [section.databases, adminPanel.current] );


    var currentTable = useMemo(() => (

        getCurrentTable( currentDatabase )
        
    ), [currentDatabase, adminPanel.current])

    

    var cachedValues = useCallback(() => [
        'currentEntryKey',
        'limit',
        'offset',
    ], [])
    
    function setValue (key, value, cb) {
        var i;

        var defineNewValue = ( s, value ) => (

            ( value instanceof Function )
            ? value( s[key] )
            : value

        )

        var set = (k,v, s) => {
            var newV = defineNewValue( s, v );

            if (cachedValues().includes( k )) {
                CacheData[k] = newV;
            }

            s[k] = newV;

        }
        
        adminPanel.setAdminSections(prev => {

            if ( cb ) {
                setTimeout(() => cb(), 4)
            }

            
            return (
                prev.map(s => {
                    if (section !== s) {
                        return s;
                    }

                    if (Array.isArray(key)) {
                        for (i = 0; i < key.length; i++) {
                            set(key[i], value[i], s)
                        }
                    }
                    else {
                        set(key, value,s)
                    }

                    return s;

                })
            )
        })

        return value;
    }

    
    
    var updateEntries = (
        databaseName,
        tableName,
    ) => {
        
        if ( !( databaseName && tableName ) )
            return

        var entryProto = {
            tableName,
            databaseName,
        }

        Function_.resolve(
            
            options.read(
                databaseName,
                tableName,

                section.offset,
                section.limit,

                section.queryObj,
            ),
            ( entries ) => {

                if ( !( Array.isArray(entries) ) ) {
                    return (
                        window.alert(
                            ( typeof entries === "string" )
                            ? ( entries )
                            : (
                                `Error of loading ${databaseName} -> ${tableName} entries`
                            )
                        )
                    )
                }

                entries = (
                    entries.map(e => (
                        Object.setPrototypeOf(e, entryProto)
                    ))
                );
                
                setValue(
                    "entries",
                    ( prev ) => prev && (

                        prev
                        .filter(( e ) => !(
                            e.databaseName === databaseName &&
                            e.tableName === tableName
                        ))
                        .concat( entries )

                    )
                )

            }
        )
    }

    

    var returnCtx = {
        setValue,
        options,

        updateEntries,
        cacheGet,

        currentEntries: (
            entries,
        ) => {
            if (!(entries instanceof Array))
                return [];

            return (
                entries
                .filter(e => (
                    e.databaseName === adminPanel.current.databaseName &&
                    e.tableName === adminPanel.current.tableName
                ))
            )
        },

        getCurrentDatabase,
        getCurrentTable,

        currentDatabase,
        currentTable,
        
        isSectionChosen: Boolean( section ),

        adminPanel,
        
        finishLoad() {
            setValue("loaded", true);
        },

        changeLoadingState(
            state,
        ) {
            state ||= "main";
            setValue("loadingState", state);
        },

        startLoad(
            loadingState,
        ) {
            loadingState ||= "main";
            
            setValue(["loadingState", 'loaded'], [loadingState, false]);
        }

    }

    if (section) {
        Object.setPrototypeOf(
            returnCtx, section,
        )
    }

    

    return returnCtx
}

export default useAdminSection;
