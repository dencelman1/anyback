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
        Function_.resolve(

            adminSection.options.getDatabases(),

            ( databases ) => (

                adminSection.setValue(
                    [
                        "databases",
                        "entries",
                        "chosenEntries",
                        'currentEntryKey',
                        "offset",
                        'limit',
                        "useSearchDebounce",
                    ],
                    [
                        ( databases || [] ),
                        [],
                        [],
                        "id",
                        adminSection.options.defaultValue.offset,
                        adminSection.options.defaultValue.limit,

                        (() => {
                            var v = CacheData.searchDebounceDelay;
                            
                            if ( v === undefined ) {
                                CacheData.searchDebounceDelay =
                                    ( v = adminSection.options.defaultValue.searchDebounceDelay );
                            }
                            return v;
                        })(),
                    ],

                    () => {
                        adminSection.finishLoad()
                    }
                )

            )

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
