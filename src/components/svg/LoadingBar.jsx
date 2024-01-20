import { useEffect, useMemo, useState } from 'react';
import './LoadingBar.scss'



var LoadingBar = ({
    loadingMessage,
}) => {

    var [loaded, setLoaded] = useState(loadingMessage === "")

    useEffect(() => {
        setTimeout(() => {
            setLoaded(loadingMessage === "")
        }, 500)
    }, [loadingMessage])

    if (loaded)
        return null
    
    return (
        <div
            className={(
                "LoadingLayout"+
                (loadingMessage === "" ? " loaded": "")
            )}
        >
            <div
                className="LoadingBar"
            >

                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />

            </div>

            <h1
                className="loadingMessage"
            >{
                loadingMessage || "Loading"
            }</h1>
        </div>
    )
}

export default LoadingBar;
