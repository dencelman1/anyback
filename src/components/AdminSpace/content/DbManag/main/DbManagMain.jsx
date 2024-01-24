import { useEffect } from 'react';
import DbManagEntryView from './DbManagEntryView/DbManagEntryView';
import './DbManagMain.scss';
import DbManagToolbar from './DbManagToolbar/DbManagToolbar';
import useAdminSection from '../../../../../hooks/useAdminSection';



var DbManagMain = () => {
    var adminSection = useAdminSection();

    useEffect(() => {
        adminSection.finishLoad();    
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
