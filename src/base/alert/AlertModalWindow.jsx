import Button from '../builtIn/Button/Button';
import './AlertModalWindow.scss';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';

var basedTypes = [
    'object',
    "function",
    "string",
];

var getMessage = (message) => {
    if ( !( basedTypes.includes( typeof message ) ) ) {
        message = `${message}`;
    }
    else if (message instanceof Object && !( "props" in message )) {
        message = JSON.stringify(message, null, 2);
    }
    return message
}


function AlertModalWindow() {
    var [data, setData] = useState({
        mode: 'alert',
        message: '',
        value: '',
        cb: null,
    })

    var inputRef = useRef(null);


    useEffect(() => {

        inputRef.current?.focus();

    })
    
    var alert = useCallback((message, cb) => {
        
        setData(p => ({
            ...p,
            message: ( message = getMessage(message) ),
            mode: 'alert',
            cb,
        }));
        
        return message;
    }, []);


    var confirm = useCallback((message, cb) => {
        
        setData(p => ({
            ...p,
            message: ( message = getMessage(message) ),
            mode: 'confirm',
            cb,
        }))

        return message;
    }, [])

    var prompt = useCallback((message, defaultValue, cb) => {
        
        setData(p => ({
            ...p,
            mode: 'prompt',
            message: ( message = getMessage(message) ),
            value: defaultValue,
            cb,
        }))

        return message;
    }, [])


    
    useEffect(() => {

        window.alert = ( alert );
        window.confirm = ( confirm );
        window.prompt = ( prompt );
        
    }, [])

    var onOk = useCallback(() => {
        setData(p => {
            
            p.cb && p.cb(
                p.mode === 'prompt'
                ? ( p.value )
                : ( true )
            )
            
            return {
                ...p,
                message: "",
                cb: null,
            };
        })
    }, []);

    var onCancel = useCallback(() => {
        setData(( p ) => {

            (
                p.mode !== 'prompt'
                && p.cb
            )
            && ( p.cb( false ) );
            
            return {
                ...p,
                message: "",
                cb: null,
            }
        })
    }, [])
    

    var onKeyDown = useCallback((e) => {
        
        if (e.key === "Enter") {
            onOk();
        }
        else if (e.key === "Escape") {
            onCancel()
        }
        
    }, [])


    var onChange = useCallback((event) => {
        setData(p => ({
            ...p,
            value: event.target.value,
        }))
    }, [])


    return (
        data.message

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
                    {data.message}
                </pre>
                {
                    data.mode === 'prompt' && (
                        <input
                            ref={inputRef}
                            spellCheck={false}
                            
                            value={data.value}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                        />
                    )
                }
                <div
                    className="actionButtons"
                >
                    <Button
                        className='okButton'
                        onClick={onOk}
                    >
                        ok
                    </Button>

                    {
                        data.mode !== "alert" && (
                            <Button
                                onClick={onCancel}
                            >
                                cancel
                            </Button>
                        )
                    }
                </div>

            </div>
            
        </div>
    )
}

export default AlertModalWindow;
