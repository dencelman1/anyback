import './Time.scss';


var TimeIcon = ({
    side,
    ...props
}) => {
    side ||= '25px';

    return (
        <svg
            {...props}
            className='TimeIcon'

            xmlns="http://www.w3.org/2000/svg"
            width={side} height={side}
            viewBox="0 0 24 24" fill="none"
        >
            <path
                d="M12 8V12L15 15"
                stroke="black"
                strokeWidth="2" strokeLinecap="round"
            />
            <circle
                cx="12" cy="12"
                r="9"
                stroke="black" strokeWidth="2"
            />
        </svg>
    )
}

export default TimeIcon;
