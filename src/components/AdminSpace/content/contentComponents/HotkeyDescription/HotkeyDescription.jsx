import './HotkeyDescription.scss';


var HotkeyDescription = ({
    hotkeys,
    ...props
}) => {

    return (
        <div
            className="HotkeyDescription"
        >
            {hotkeys.map((hotkey, index) => (
                <p
                    className='hotkey'
                    key={index}
                >
                    <span
                        className="desc"
                    >
                        {hotkey.desc}
                    </span>
                    
                    <span
                        className="combo"
                    >
                        {
                            hotkey.keys.map((k, index) => (
                                <span
                                    key={index}
                                >
                                    <span
                                        className="key"
                                    >
                                        {k}
                                    </span>

                                    {
                                        (
                                            (hotkey.keys.length - 1)
                                            !== index
                                        )
                                        && " + "
                                    }
                                    
                                </span>
                            ))
                        }
                    </span>
                </p>
            ))}
        </div>
    )
}


export default HotkeyDescription;
