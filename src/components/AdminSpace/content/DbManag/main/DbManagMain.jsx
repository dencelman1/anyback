import { useEffect,  } from 'react';
import './DbManagMain.scss';
import useAdminSection from '../../../../../hooks/useAdminSection';
import Function_ from '../../../../../base/utils/Function_';
import CacheData from '../../../../../api/local/CacheData/CacheData';
import DbManagToolbar from './DbManagToolbar/DbManagToolbar';
import DbManagEntryView from './DbManagEntryView/DbManagEntryView';



var DbManagMain = () => {
    var adminSection = useAdminSection();

    Function_
    
    useEffect(() => {

        var cacheGet = (
            name,

        ) => {
            var v = CacheData[name];
                            
            if ( v === undefined ) {
                CacheData[name] = (
                    v = adminSection.options.defaultValue[name]
                );
            }

            return v;
        }

        Function_.resolve(

            adminSection.options.getDatabases(),

            ( databases ) => {


                adminSection.setValue(
                    [
                        "databases",
                        "entries",
                        "chosenEntries",

                        'currentEntryKey',

                        "offset",
                        'limit',

                        "searchDebounceDelay",
                        "queryObj",
                    ],
                    [
                        ( databases || [] ),
                        [],
                        [],

                        cacheGet("currentEntryKey"),

                        cacheGet("offset"),
                        cacheGet("limit"),
                        
                        cacheGet("searchDebounceDelay"),
                        {},
                    ],

                    () => {
                        adminSection.finishLoad()
                    }
                )

            }

        )
    }, [])

    return (
        <div
            className="DbManagMain__main"
        >
            
            <DbManagToolbar

            />

            <DbManagEntryView

            />

        </div>
    )

}

export default DbManagMain;
