import Analytics from "./Analytics/Analytics";
import DbManag from "./DbManag/DbManag";




export function HotkeyDescription ({
    hotkeys,
    ...props
}) {

    return (
        <div
            style={{
                userSelect: 'none',
                marginTop: '20px',
                marginBottom: '50px',
            }}
        >
            {hotkeys.map((hotkey) => <p style={{
                margin: '0',
                padding: '0',
                marginTop: '10px',
            }}>
                
                
                
                    <span>
                        {hotkey.desc}
                    </span>
                    
                    <span
                        style={{
                            marginLeft: '10px'
                        }}
                    >
                        {hotkey.keys.map((k, index) => {
                            return (<>
                                <span
                                    style={{
                                        background: 'gray',
                                        color: 'white',
                                        padding: '0 5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    {k}
                                </span>{((hotkey.keys.length - 1) !== index) && " + "}
                            </>)
                        })}
                    </span>
            </p>)}
        </div>
    )
}


export var adminSections = [
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
