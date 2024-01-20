



var Text = {

    getLimited(
        text,
        maxLength,
    ) {
        maxLength ||= 20
        
        return (
            text.length > maxLength
            ? text.slice(0, maxLength - 2 ) + '..'
            : text
        )
    }
    
}
export default Text;
