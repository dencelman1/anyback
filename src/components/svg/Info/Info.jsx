import './Info.scss';


var InfoIcon = ({
    side,
    ...props
}) => {
    side ||= '25px';

    return (
        <svg
            {...props}
            
            className="InfoIcon"
            xmlns="http://www.w3.org/2000/svg"
            width={side} height={side}
            viewBox="0 0 24 24" fill="none"
        >
            <path
                d="M12 11V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#000000" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
            />
            <circle
                cx="12" cy="7.5"
                r="1" fill="#000000"
            />

        </svg>
    )
}

export default InfoIcon;
