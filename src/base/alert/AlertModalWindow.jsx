import './AlertModalWindow.scss';
import React, { useEffect, useState } from 'react';


function AlertModalWindow() {
    var [text, setText] = useState("")

    function alert(message) {
        
        if (typeof message !== "function") {
            message = `${message}`;
        }

        setText && setText(message)

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
                <span
                    className='alertText'
                >
                    {text}
                </span>
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
