import { useAdminPanel } from "./useAdminPanel"


var useAdminSection = () => {
    var adminPanel = useAdminPanel()

    var section = adminPanel.current.section

    if (!section)
        return null;
        
    return {
        options: section,
        finishLoad() {
            adminPanel.setUserData(p => ({...p, loadingMessage: ""}))
        },

        startLoad(message) {
            adminPanel.setUserData(p => ({...p, loadingMessage: message || "Loading.."}))
        }
    }
}

export default useAdminSection;
