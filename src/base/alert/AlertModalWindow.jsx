import './AlertModalWindow.scss';
import React, { useEffect, useMemo, useState } from 'react';


function AlertModalWindow() {
    var [text, setText] = useState("")

    var basedTypes = useMemo(() => [
        'object',
        "function",
        "string",
    ], [])

    function alert(message) {

        
        if ( !( basedTypes.includes( typeof message ) ) ) {
            message = `${message}`;
        }
        else if (message instanceof Object && !( "props" in message )) {
            message = JSON.stringify(message, null, 2);
        }
        
        setText && setText(message);

        return message;
    }
    
    useEffect(() => {
        window.alert = alert;
    }, [])

    return (
        text !== ''

        &&
        
        <div
            className="AlertModalWindow"
        >
            <div
                className="contentModal"
            >
                <pre
                    className='alertText default-scroll-bar row column thin'
                >
                    {text}
                </pre>
                <button
                    className='okButton'
                    onClick={() => ( alert("") )}
                >
                    OK
                </button>

            </div>
            
        </div>
    )
}

export default AlertModalWindow;
