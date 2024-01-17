import Button from '../../../base/builtIn/Button/Button'
import { useAdminPanel } from '../../../hooks/useAdminPanel'
import './LeftSideBar.scss'

var adminSections = [
    { name: "database", },
    { name: "analytics", },
]

var LeftSideBar = () => {
    var adminPanel = useAdminPanel()

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
                    adminSections.map((section, i) => (
                        
                        <Button
                            key={i}
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
                            {section.name}
                        </Button>
                        
                    ))
                }
            </div>

            <div
                className="openingLever"
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
