import { useEffect, useState,  } from 'react';
import './DbManagMain.scss';
import useAdminSection from '../../../../../hooks/useAdminSection';
import Function_ from '../../../../../base/utils/Function_';

import DbManagToolbar from './DbManagToolbar/DbManagToolbar';
import DbManagEntryView from './DbManagEntryView/DbManagEntryView';


var DbManagMain = () => {
    var adminSection = useAdminSection();
    var [isLoading, setIsLoading] = useState(true);

    

    useEffect(() => {
        var cacheGet = adminSection.cacheGet;
        
        

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

                        cacheGet( "currentEntryKey", ),
                        
                        cacheGet("offset",),
                        cacheGet("limit", ),
                        
                        cacheGet("searchDebounceDelay", ),
                        {},
                    ],

                    () => {
                        adminSection.setCachedKeys([
                            'currentEntryKey',
                            'limit',
                            'offset',

                            'searchDebounceDelay',
                        ])

                        adminSection.finishLoad()
                        setIsLoading(false)
                    }
                )

            }

        )
    }, [])

    if (isLoading)
        return null;

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
