import { useEffect } from 'react';
import DbManagEntryView from './DbManagEntryView/DbManagEntryView';
import './DbManagMain.scss';
import DbManagToolbar from './DbManagToolbar/DbManagToolbar';



var DbManagMain = () => {
    
    return (
        <div
            className="DbManagMain__main"
        >
            <input
                className="globalHotkeyListenerInput"
                style={{
                    display: "none"
                }}
            />

            <DbManagToolbar

            />

            <DbManagEntryView

            />

        </div>
    )

}

export default DbManagMain;
