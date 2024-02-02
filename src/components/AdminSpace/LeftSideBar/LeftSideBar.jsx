import { useState } from 'react'
import Button from '../../../base/builtIn/Button/Button'
import { OpeningLever } from '../../../base/components'
import { useAdminPanel } from '../../../hooks/useAdminPanel'
import LogOutIcon from '../../svg/LogOut/LogOut'
import SettingsIcon from '../../svg/Settings/Settings'
import './LeftSideBar.scss'

import AceEditor from 'react-ace';
import JsEditor from '../../../base/builtIn/Textarea/JsEditor/JsEditor'




var LeftSideBar = () => {
    var adminPanel = useAdminPanel()
    var sections = adminPanel.sections

    var [code, setCode] = useState()

    return (
        <div
            className={(
                `leftSideBar `+
                `${adminPanel.isSectionChosen() ? " withChosenSection": "" }`+
                `${adminPanel.opened.leftSideBar ? "": ' closed'}`
            )}
            
        >
            <div className="sectionButtons default-scroll-bar column thin">
                {
                    sections
                    .map((section, i) => (
                        
                        <Button
                            key={i}
                            title={section.title}
                            className={(
                                `sectionButton `+
                                `${adminPanel.current.section === section ? "current": ''}`
                            )}
                            onClick={() => 
                                adminPanel.setCurrent(prev => ({
                                    ...prev,
                                    section:
                                        prev.section === section ? null: section
                                }))}
                        >
                            {
                                section.title
                            }
                        </Button>
                        
                    ))
                }
                
            </div>

            <OpeningLever
                onClick={() =>
                    adminPanel.setOpened(prev => ({
                        ...prev,
                        leftSideBar: !(prev.leftSideBar),
                    }))
                }
            />

            <div
                className="appButtons"
            >

                <Button
                    onClick={() => adminPanel.logout(
                        () => adminPanel.options.onLogout()
                    )}
                    className="logoutButton"
                    
                >
                    <LogOutIcon
                        side={40}
                    />

                    <span>
                        Log out
                    </span>
                </Button>

                <Button
                    className={(
                        "settingsButton" +
                        (adminPanel.opened.settings ? " current": '')
                    )}
                    onClick={() => adminPanel.setOpened(p => {
                        return {
                            ...p,
                            settings: !( p.settings ),
                        }
                    })}
                >
                    <SettingsIcon
                        side={"40px"}
                    />
                </Button>

            </div>

        </div>
    )
}

export default LeftSideBar;
