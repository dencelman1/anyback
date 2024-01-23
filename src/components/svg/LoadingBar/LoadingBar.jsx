import { useEffect, useMemo, useState } from 'react';
import './LoadingBar.scss'



var LoadingBar = ({
    loadingMessage,
}) => {
    

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
                loadingMessage || "Loaded"
            }</h1>
        </div>
    )
}

export default LoadingBar;
