import { useAdminPanel } from '../../../hooks/useAdminPanel';
import './Main.scss'


var Main = ({
    ...props
}) => {
    var adminPanel = useAdminPanel()

    var currentSection = adminPanel.current.section

    if (!currentSection)
        return null
    
    return (
        <main
            {...props}
            className="mainContent"
        >
            {<currentSection.element.main />}
        </main>
    )
}

export default Main;
