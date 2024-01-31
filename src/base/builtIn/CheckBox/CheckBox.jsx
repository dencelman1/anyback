import { useEffect, useRef, useState } from "react"
import './CheckBox.scss';


var CheckBoxEvent = (
    checked,
) => ({
    target: {
        value: checked,
        checked,
    },

});


var CheckBox = ({
    children,
    defaultValue,

    ...props
}) => {
    
    var [checked, setChecked] = useState(defaultValue || false)
    var inputRef = useRef(null);

    useEffect(() => {

        
        
    }, [checked])

    var onClick = () => {
        
        setChecked(p => {
            var newValue = !p;
            
            props.onChange && props.onChange( CheckBoxEvent( newValue ) );
            
            return newValue;
        })
        

    }

    return (
        <div
            className={(
                ( "CheckBox" ) +
                (props.className ? ` ${props.className}` : "") +
                (checked ? " checked": "")
            )}
            style={props.style || {}}
        >
            <div
                className="ballSpace"
                onClick={onClick}
            >
                <div
                    className="ball"
                />
            </div>

            <label
                className="mainLabel"
            >
                {children}
            </label>
            <input
                type='checkbox'
                ref={inputRef}

                checked={checked}
                value={checked}

                {...props}
            />
            
        </div>
    )
}

export default CheckBox;
