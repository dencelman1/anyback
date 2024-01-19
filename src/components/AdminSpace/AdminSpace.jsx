import { useAdminPanel } from '../../hooks/useAdminPanel';
import AuthForm from '../AuthForm/AuthForm';
import './AdminSpace.scss';
import {
    RightSideBar,
    Main, 
    LeftSideBar,
} from './index'



var AdminSpace = () => {
    var adminPanel = useAdminPanel()
    var authed = adminPanel.userData.authed
    
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
                    <AuthForm />
                )
            }
            

        </div>
    )
}

export default AdminSpace;
