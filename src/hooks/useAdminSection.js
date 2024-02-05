import {  useCallback, useMemo, useState } from "react";
import { useAdminPanel } from "./useAdminPanel"
import Function_ from "../base/utils/Function_";
import CacheData from "../api/local/CacheData/CacheData";
import useCacheState from "./useCacheState";





var useAdminSection = () => {

    var adminPanel = useAdminPanel();
    var options = adminPanel.options;

    var section = adminPanel.current.section;


    var getCacheKey = useCallback((key) => (
        `${section?.name || "global"}_${key}`
    ), [section])

    var [localStorageKeys, setLocalStorageCachedKeys] = useCacheState([], getCacheKey('localStorageKeys'));
    var [cachedValues, setCachedValues] = useCacheState([], getCacheKey("cachedValues"));
    
    

    var cacheGet = (
        name,
        defaultValue,
        type
    ) => {
        type ||= 'cookie';
        defaultValue ||= options.defaultValue[name];

        name = getCacheKey( name );
        
        var v = {
            cookie: (n) => CacheData[n],
            localStorage: (n) => JSON.parse( localStorage.getItem(n) ),
        }
        [type](name);
        
        var set = {
            cookie: (key, value) => {
                CacheData[key] = value;
            },
            localStorage: (key, value) => {
                localStorage.setItem(
                    key,
                    JSON.stringify(value)
                )
            }
        }[type];
        
        if ( [ undefined, null ].includes(v) ) {
            v = defaultValue;
            set(name, defaultValue)
        };

        return v;
    }
    
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

    

    
    
    var setValue = (key, value, cb) => {
        var i;

        var defineNewValue = ( k,v, s ) => (

            ( v instanceof Function )
            ? v( s[k] )
            : v

        )

        var set = (k,v, s) => {
            var newV = defineNewValue(k,v, s);
            
            if (localStorageKeys.includes( k )) {
                
                localStorage.setItem(
                    getCacheKey(k),
                    JSON.stringify(newV)
                );

            }

            

            else if (cachedValues.includes( k )) {
                CacheData[ getCacheKey(k) ] = newV;
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
                        set( key, value,s )
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

        setLocalStorageCachedKeys,

        currentEntries: (
            entries,
        ) => {
            if (!(Array.isArray(entries)))
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
        getCacheKey,

        currentDatabase,
        currentTable,
        
        isSectionChosen: Boolean( section ),

        adminPanel,

        setCachedKeys(keys) {
            if (typeof keys === "string") {
                keys = [ keys ]
            }
            else if ( !( Array.isArray( keys ) ) ) {
                throw TypeError("input param 'keys' must be have string[] or string type");
            }
            
            setCachedValues( keys );
        },
        
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
