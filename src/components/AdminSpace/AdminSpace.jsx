import AuthForm from '../AuthForm/AuthForm';
import './AdminSpace.scss';
import SettingsModalBlock from './SettingsModalBlock/SettingsModalBlock';
import {
    RightSideBar,
    Main, 
    LeftSideBar,
} from './index'
import useAdminSection from '../../hooks/useAdminSection';


var AdminSpace = () => {
    var adminSection = useAdminSection();
    var adminPanel = adminSection.adminPanel;
    
    var authed = adminPanel.userData.authed;

    var settingsOpened = adminPanel.opened.settings;
    var isSectionChosen = adminPanel.isSectionChosen();

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

                    <SettingsModalBlock
                        isOpened={settingsOpened}
                        style={{
                            minWidth:
                                ( !isSectionChosen && settingsOpened )
                                ? "50%"
                                : (
                                    ""
                                )
                        }}
                    />

                    {
                        ( isSectionChosen ) && (
                            <>
                                <Main
                                    style={{
                                        display: settingsOpened ? "none": '',
                                    }}
                                />
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
