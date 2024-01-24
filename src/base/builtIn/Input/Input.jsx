import React, { useRef } from 'react';
import './Input.scss';


export default function Input(
    props,
) {
    var inputRef = props.forwardRef || useRef(null);

    var onKeyDown = (event) => {
        if (props.onKeyDown)
            props.onKeyDown(event)

        if (event.key === "Escape") {
            inputRef.current?.blur()
        }
    }

    return (
        <input
            {...{
                ...props,
                ref:  inputRef,
                onKeyDown,
                className: "Input" + (props.className ? ` ${props.className}`: ""),
                spellCheck: false,
            }}
        />
    )
}

