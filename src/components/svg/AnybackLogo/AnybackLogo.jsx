var logoColor = "rgb(38,38,38)"


function AnybackLogo({
    side,
    href,
    ...props

}) {
    
    side ||= "50px";
    
    var LogoWrapper = ({...wrapProps}) => (
        href
        ? (
            <a
                {...props}

                href={href}
                target="_blank"
                style={{
                    ...(props.style || {}),
                    width: side,
                    height: side,
                    cursor: "pointer",
                }}
            >
                {wrapProps.children}
            </a>
        )
        : (
            <>
                {wrapProps.children}
            </>
        )
    )
    
    return (
        
        <LogoWrapper>

            <img
                
                src="/anyback_logo.png"
                className="AnybackLogo"
                alt="The official logo of the open source admin panel called AnyBack"
                
                style={{
                    ...(href ? {}: (props.style || {})),
                    width: side,
                    height: side,
                    userSelect: 'none',
                    pointerEvents: "none",
                }}
            />
            
        </LogoWrapper>

    )
}

export default AnybackLogo;
