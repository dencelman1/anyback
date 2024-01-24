import { useEffect, useRef } from 'react';
import './LoadingBar.scss'



var LoadingBar = ({
    loadingMessage,
}) => {

    var layoutRef = useRef(null);

    useEffect(() => {
        if (! ( layoutRef.current ))
            return
        
        var layout = layoutRef.current

        function onTransitionEnd () {
            if (layout.style.display === "flex") {
                layout.style.display = "none"
            }
            
        }
        function onTransitionStart () {
            if (layout.style.display === "none") {
                layout.style.display = "flex"
            }
        }

        layout.addEventListener("transitionstart", onTransitionStart)
        layout.addEventListener("transitionend", onTransitionEnd)

        return () => {
            layout.removeEventListener("transitionstart", onTransitionStart)
            layout.removeEventListener("transitionend", onTransitionEnd)

        }
        
        
        
    }, [loadingMessage])
    

    return (
        <div
            className={(
                "LoadingLayout"+
                (loadingMessage === "" ? " loaded": "")
            )}
            ref={layoutRef}
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
                loadingMessage || "Loaded"
            }</h1>
        </div>
    )
}

export default LoadingBar;
