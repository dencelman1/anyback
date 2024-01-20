import Button from '../../../base/builtIn/Button/Button'
import { OpeningLever } from '../../../base/components'
import Text from '../../../base/utils/Text'
import { useAdminPanel } from '../../../hooks/useAdminPanel'
import LogOutIcon from '../../svg/LogOut/LogOut'
import './LeftSideBar.scss'





var LeftSideBar = () => {
    var adminPanel = useAdminPanel()
    var sections = adminPanel.sections
    
    return (
        <div
            className={(
                `leftSideBar `+
                `${adminPanel.isSectionChosen() ? " withChosenSection": "" }`+
                `${adminPanel.opened.leftSideBar ? "": ' closed'}`
            )}
            
        >
            <div className="sectionButtons">
                {
                    sections.map((section, i) => (
                        
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
                                adminPanel.isSectionChosen()
                                ? Text.getLimited(section.title, 12)
                                : section.title
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

            <Button
                onClick={() => adminPanel.logout()}
                className="logoutButton"
                
            >
                <LogOutIcon side={40} />
                <span
                >
                    Log out
                </span>
            </Button>

        </div>
    )
}

export default LeftSideBar;
