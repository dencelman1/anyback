

var CheckMarkIcon = ({
    side,
    fill,

}) => {
    side ||= "25px";
    fill ||= "#77B255";
    
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={side} height={side}
            viewBox="0 0 36 36" aria-hidden="true"
            role="img" preserveAspectRatio="xMidYMid meet"
        >
            <path
                fill={fill}
                d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665c.673 0 1.534-.282 2.099-1.139c.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"
            />
        </svg>    
    )
}

export default CheckMarkIcon;
