import { useAdminPanel } from '../../hooks/useAdminPanel'
import './LeftSideBar.scss'

var adminSections = [
    { name: "Database", },
    { name: "Analytics", },
]

var LeftSideBar = () => {
    var [adminPanel, adminDispatch] = useAdminPanel()

    return (
        <div
            className='left-side-bar'
            style={{
                width:
                    adminPanel.current.section === "" ? "100%": adminPanel.opened.sections
            }}
        >
            {
                adminSections.map((section, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() => adminDispatch(['current', 'section', section.name])}
                        >
                            {section.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LeftSideBar;
