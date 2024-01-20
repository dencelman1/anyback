

import React, { ReactNode, useEffect, useRef, useState } from "react"
import "./FormInput.scss"
import Input from "../input"


var count = 0

var FormInput = ({
    label,
    value,
    style,
    darkTheme,
    name,
    ...props
},) => {

    darkTheme ||= false
    style ||= {}
    value ||= ""

    name ||= `formInput__${++count}`

    var [focused, setFocused] = useState(false)
    var [filled, setFilled] = useState(value !== '')
    
    var labelElement =
        typeof label === "string"
        ? (
            <label
                htmlFor={name}
            >
                {label}
            </label>
        )
        : label

    return (
        <div
            className={(
                "FormInput" +
                (focused ? " focused": "")+
                ((filled || focused) ? " filled": "")+
                (darkTheme ? " dark": ' white')
            )}
            style={style}
        >
            {labelElement}

            <Input
                {...props}
                
                name={name}

                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(event) => {
                    if (props.onChange)
                        props.onChange(event)
                    
                    setFilled(event.target.value !== "")
                }}
                defaultValue={value}
                
            />
        </div>
    );
}

export default FormInput;
