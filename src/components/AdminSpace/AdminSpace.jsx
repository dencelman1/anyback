import {  useMemo } from 'react';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import AuthForm from '../AuthForm/AuthForm';
import './AdminSpace.scss';
import {
    RightSideBar,
    Main, 
    LeftSideBar,
} from './index'



var AdminSpace = ({
    options,
}) => {
    var adminPanel = useAdminPanel()

    var authed = useMemo(
        () => {
            return adminPanel.userData.authed
        },
        [adminPanel.userData]
    )
    
    
    return (
        <div 
            className={(
                "adminSpace"+
                (authed ? "": " notAuthed")
            )}
        >
            {
                authed
                ? (<>
                    <LeftSideBar />
                    {
                        adminPanel.isSectionChosen() && (
                            <>
                                <Main />
                                <RightSideBar />
                            </>
                        )
                    }
                </>)
                : (
                    <AuthForm
                        options={options}
                    />
                )
            }
            

        </div>
    )
}

export default AdminSpace;
