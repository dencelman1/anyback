import './Button.scss'

var Button = (props) => {
    return (
        <button
            {...props}

            className={"Button" + (props.className ? ` ${props.className}`: "")}
        >
            {props.children}
        </button>
    )

}

export default Button;
