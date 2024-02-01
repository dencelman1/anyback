import { useEffect,  } from 'react';
import './DbManagMain.scss';
import useAdminSection from '../../../../../hooks/useAdminSection';
import Function_ from '../../../../../base/utils/Function_';

import DbManagToolbar from './DbManagToolbar/DbManagToolbar';
import DbManagEntryView from './DbManagEntryView/DbManagEntryView';



var DbManagMain = () => {
    var adminSection = useAdminSection();
    var cacheGet = adminSection.cacheGet;

    useEffect(() => {

        


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

                        adminSection.currentEntryKey,

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
