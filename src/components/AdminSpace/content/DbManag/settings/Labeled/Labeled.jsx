

var Labeled = ({
    title,

    children
}) => {
    return (
        <label
            style={{
                marginTop: '20px',
            }}
        >
            {children}

            <span
                style={{
                    marginLeft: '20px',
                    whiteSpace: 'nowrap'
                }}
            >
                {title}
            </span>

        </label>
    )
}

export default Labeled;
