

function HotkeyDescription ({
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
            {hotkeys.map((hotkey, i) => (
                <p
                    style={{
                        margin: '0',
                        padding: '0',
                        marginTop: '10px',
                    }}
                    key={i}
                >
                    <span>
                        {hotkey.desc}
                    </span>
                    
                    <span
                        style={{
                            marginLeft: '10px'
                        }}
                    >
                        {
                            hotkey.keys.map((k, index) => (<>
                                <span
                                    key={index}
                                    style={{
                                        background: 'gray',
                                        color: 'white',
                                        padding: '0 5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    {k}
                                </span>
                                {((hotkey.keys.length - 1) !== index) && " + "}
                                
                            </>))
                        }
                    </span>
                </p>
            ))}
        </div>
    )
}


export default HotkeyDescription;
