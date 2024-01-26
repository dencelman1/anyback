

var ArrowIcon = ({
    side,
    ...props
}) => {
    side ||= "25px";
    
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={side} height={side}
            viewBox="0 0 24 24" fill="none"
            className="ArrowIcon"
        >
            <path 
                d="M12 18L7 13M12 18L17 13"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default ArrowIcon;
