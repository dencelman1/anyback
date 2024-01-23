import Analytics from "./Analytics/Analytics";
import DbManag from "./DbManag/DbManag";







var adminSections = [
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
        ), // TODO: for custom sections
        
        hotkeys: [
            { keys: ["Ctrl", "Shift"], desc: 'To previous', },
            { keys: ["Ctrl", 'z'], desc: 'To next', },
            { keys: ["Ctrl", "Delete"], desc: 'Remove from selected', },
            { keys: ["Ctrl", "Backspace"], desc: 'Exit viewing', },
            { keys: ["Ctrl", "Enter"], desc: 'Create new', },
        ],

    },

    {
        name: "Analytics",
        title: "Analytics",
        element: Analytics,
        Logo: null,
        hotkeys: [],
    },
]

export default adminSections;
