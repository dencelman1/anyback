import { useAdminPanel } from "./useAdminPanel"


var useAdminSection = () => {
    var adminPanel = useAdminPanel()

    var section = adminPanel.current.section

    if (!section)
        return null;

    function setSectionValue (key, value) {
        var i ;
        adminPanel.setAdminSections(
            [
                ...adminPanel.sections.map(s => {
                    if (section === s) {

                        if (Array.isArray(key)) {
                            for (i = 0; i < key.length; i++) {
                                s[key[i]] = value[i]
                            }
                        }
                        else {
                            s[key] = value
                        }
                        
                    }
                    
                    return s
                })
            ]
        )
    }
        
    return {
        section,
        setSectionValue,

        finishLoad() {
            setSectionValue("loaded", true);
        },

        changeLoadingState(
            state,
        ) {
            state ||= "main";
            setSectionValue("loadingState", state);
        },

        startLoad(
            loadingState,
        ) {
            loadingState ||= "main";
            
            setSectionValue(["loadingState", 'loaded'], [loadingState, false]);

        }

    }
}

export default useAdminSection;
