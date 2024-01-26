import { useAdminPanel } from '../../../hooks/useAdminPanel';
import './Main.scss'


var Main = () => {
    var adminPanel = useAdminPanel()

    var currentSection = adminPanel.current.section

    if (!currentSection)
        return null
    
    return (
        <main
            className="mainContent"
        >
            {<currentSection.element.main />}
        </main>
    )
}

export default Main;
