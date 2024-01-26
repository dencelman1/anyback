import { useEffect,  } from 'react';
import DbManagEntryView from './DbManagEntryView/DbManagEntryView';
import './DbManagMain.scss';
import DbManagToolbar from './DbManagToolbar/DbManagToolbar';
import useAdminSection from '../../../../../hooks/useAdminSection';
import Function_ from '../../../../../base/utils/Function_';


var DbManagMain = () => {
    var adminSection = useAdminSection();
    
    useEffect(() => {
        Function_.resolve(

            adminSection.options.getDatabases(),

            ( response ) => (

                adminSection.setValue(
                    [
                        "databases",
                        "entries",
                        "chosenEntries",
                        'currentEntryKey',
                    ],
                    [
                        (response.data || []),
                        [],
                        [],
                        "id",
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
