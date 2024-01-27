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

            ( databases ) => (

                adminSection.setValue(
                    [
                        "databases",
                        "entries",
                        "chosenEntries",
                        'currentEntryKey',
                        "offset",
                        'limit',
                    ],
                    [
                        (databases || []),
                        [],
                        [],
                        "id",
                        adminSection.options.defaultValue.offset,
                        adminSection.options.defaultValue.limit,
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
