



var Text = {

    getLimited(
        text,
        maxLength,
    ) {
        maxLength ||= 20
        
        return (
            text.length > maxLength
            ? text.slice(0, maxLength -4 ) + '....'
            : text
        )
    }
    
}
export default Text;
