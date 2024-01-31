import { useEffect } from "react";
import { useAdminPanel } from "./useAdminPanel"


var useAdminSection = (
    
) => {
    var adminPanel = useAdminPanel();
    var section = adminPanel.current.section;
    
    function setValue (key, value, cb) {
        var i;

        var defineNewValue = ( s, value ) => (

            ( value instanceof Function )
            ? value( s[key] )
            : value

        )

        adminPanel.setAdminSections(prev => {

            if (cb)
                setTimeout(() => cb(), 4)

            return (
                prev.map(s => {
                    if (section !== s)
                        return s
                    
                    if (Array.isArray(key)) {
                        for (i = 0; i < key.length; i++) {
                            s[key[i]] = defineNewValue(s, value[i])
                        }
                    }
                    else {
                        s[key] = defineNewValue(s, value)
                    }

                    return s;
                })
            )
        })

        return value;
    }
        
    var returnCtx = {
        setValue,
        options: adminPanel.options,

        isSectionChosen: Boolean( section ),

        adminPanel,
        
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

    if (section) {
        Object.setPrototypeOf(
            returnCtx, section,
        )
    }

    return returnCtx
}

export default useAdminSection;
