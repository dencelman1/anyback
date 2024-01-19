import Button from '../../../base/builtIn/Button/Button'
import { OpeningLever } from '../../../base/components'
import Text from '../../../base/utils/Text'
import { useAdminPanel } from '../../../hooks/useAdminPanel'
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
                                ? Text.getLimited(section.title, 16)
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

        </div>
    )
}

export default LeftSideBar;
