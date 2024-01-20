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
                `${adminPanel.current.section === "" ? "": " withChosenSection"}`+
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
                                `${adminPanel.current.section === section.name ? "current": ''}`
                            )}
                            onClick={() => 
                                adminPanel.setCurrent(prev => ({
                                    ...prev,
                                    section:
                                        prev.section === section.name ? "": section.name
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
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',

                    bottom: "10px",

                    left: '50%',
                    transform: 'translate(-50%, 0)',

                    height: '39px',
                    padding: '0',
                    margin: '0'
                }}
            >
                <LogOutIcon side={39} />
                <span
                    style={{
                        display: 'block',
                        lineHeight: '39px',
                        marginLeft: '10px',
                        whiteSpace: 'nowrap',
                        fontSize: '20px',
                    }}
                >Log out</span>
            </Button>

        </div>
    )
}

export default LeftSideBar;
