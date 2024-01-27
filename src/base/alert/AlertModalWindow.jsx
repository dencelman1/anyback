import styles from './AlertModalWindow.module.scss';
import React, { useEffect, useState } from 'react';


function AlertModalWindow({
    children,
    ...props
}) {
    var [text, setText] = useState("")

    function alert(message) {
        
        if (typeof message !== "function") {
            message = `${message}`;
        }

        setText && setText(message)
    }
    
    useEffect(() => {
        window.alert = alert;
    }, [])

    return (
        text !== ''

        &&
        
        <div
            className={styles.AlertModalWindow}
        >
            <div
                className={styles.contentModal}
            >
                <span
                    className={styles.alertText}
                >
                    {text}
                </span>
                <button
                    className={styles.okButton}
                    onClick={() => ( alert("") )}
                >
                    OK
                </button>

            </div>
            
        </div>
    )
}

export default AlertModalWindow;
