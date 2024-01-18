import './OpeningLever.scss'


var OpeningLever = (
    props,
) => {
    return (
        <div
            {...props}
            className={("openingLever" + (props.className ? `${props.className}`: ""))}
        />
    )
}

export default OpeningLever;
