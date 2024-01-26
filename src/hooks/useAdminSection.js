import { useEffect } from "react";
import { useAdminPanel } from "./useAdminPanel"


var useAdminSection = (
    
) => {
    var adminPanel = useAdminPanel();
    var section = adminPanel.current.section;
    
    if (!section)
        return null;

    

    function setValue (key, value, cb) {
        var i;

        adminPanel.setAdminSections(prev => {

            if (cb)
                setTimeout(() => cb(), 4)

            return (
                prev.map(s => {
                    if (section !== s)
                        return s
                    
                    if (Array.isArray(key)) {
                        for (i = 0; i < key.length; i++) {
                            s[key[i]] = value[i]
                        }
                    }
                    else if (value instanceof Function) {
                        s[key] = value(s[key])
                    }
                    else {
                        s[key] = value
                    }

                    return s;
                })
            )
        })
    }
        
    var returnCtx = {
        setValue,
        options: adminPanel.options,
        
        finishLoad() {
            setValue("loaded", true);
        },

        changeLoadingState(
            state,
        ) {
            state ||= "main";
            setValue("loadingState", state);
        },

        startLoad(
            loadingState,
        ) {
            loadingState ||= "main";
            
            setValue(["loadingState", 'loaded'], [loadingState, false]);
        }

    }

    Object.setPrototypeOf(
        returnCtx, section,
    )

    return returnCtx
}

export default useAdminSection;
