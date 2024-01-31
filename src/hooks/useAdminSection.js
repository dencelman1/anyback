import { useEffect } from "react";
import { useAdminPanel } from "./useAdminPanel"
import Function_ from "../base/utils/Function_";
import AdminSection from "../components/AdminSpace/content/AdminSection";


var useAdminSection = (
    
) => {
    var adminPanel = useAdminPanel();
    var section = adminPanel.current.section;

    var options = adminPanel.options;
    
    function setValue (key, value, cb) {
        var i;

        var defineNewValue = ( s, value ) => (

            ( value instanceof Function )
            ? value( s[key] )
            : value

        )
        
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
                            s[ key[i] ] = defineNewValue( s, value[i] )
                        }
                    }
                    else {
                        s[key] = defineNewValue(s, value)
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
