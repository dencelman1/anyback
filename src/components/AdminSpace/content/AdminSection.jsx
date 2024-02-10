import Analytics from "./Analytics/Analytics.jsx";
import DbManag from "./DbManag/DbManag.jsx";




var getSectionStateValue = () => {
    
    return {
        loaded: false,
        loadingState: "main",
    }
};

var defaultLoadingMessage = "Loading..";

var getCheckedSection = (section) => {
    
    // loadingMessage
    if (typeof section.loadingMessage === "string") {

        section.loadingMessage = {
            main: section.loadingMessage,
        }

    }
    else if (
        typeof section.loadingMessage !== "object" ||
        Array.isArray(section.loadingMessage) ||
        section.loadingMessage === undefined
    ) {
        section.loadingMessage = {
            main: defaultLoadingMessage,
        }
    }

    return section
}

var getSectionState = (
    sectionProto,
) => {
    var stateValue = getSectionStateValue();

    return Object.setPrototypeOf(
        stateValue,
        getCheckedSection( sectionProto ),
    )
};

var data = [
    {
        name: "DbManag",
        title: "Database management",

        element: DbManag,
        Logo: () => (
            <AnybackLogo
                side="200px"
                style={{
                    margin: 'auto',
                    marginTop: '50px',
                    opacity: '.6',
                }}
            />
        ),
        
        hotkeys: [
            { keys: ["Ctrl", "Shift"], desc: 'To previous', },
            { keys: ["Ctrl", 'z'], desc: 'To next', },
            { keys: ["Ctrl", "Delete"], desc: 'Remove from selected', },
            { keys: ["Ctrl", "Backspace"], desc: 'Exit viewing', },
            { keys: ["Ctrl", "Enter"], desc: 'Create new', },
        ],

        loadingMessage: {
            main: 'Loading databases data ⌛',
            SIMPLE_LOAD_STATE: "Dont panic, simple load",
            firstLoad: 'First load wait, please',
        },
        
    },

    {
        name: "Analytics",
        title: "Analytics",
        element: Analytics,
        hotkeys: [
            { keys: ["Ctrl", "S"], desc: 'Save and rerun formula', },
            { keys: ["Ctrl", "Enter"], desc: "Create new"},
        ],

        loadingMessage: 'Getting statistic and analytics 📃',
    },
    
]



var AdminSection = {
    data,
    defaultLoadingMessage,

    states() {
        var state = data.map((section) => (
            getSectionState(section)
        ))
        
        return (
            state
        )

    }
}

export default AdminSection;
