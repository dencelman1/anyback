
var getLeftTime = ( f ) => {
    return ( ( performance.now() - f ) / 1000 ).toFixed(3)
}

var setOperTime = ( first ) => {

    var timeElement;
     
    ( timeElement = document.getElementById("dbManagOperTime") )
    && ( timeElement.textContent = getLeftTime( first ) )
    
};

var resolve = (

    callInstanse,
    callback,
    onError,

) => {
    var f = performance.now(), r;
    
    onError ||= window.alert;

    if (callInstanse instanceof Promise) {
        return (
            callInstanse
            .then( callback )
            .catch(onError)
            .finally(() => {
                setOperTime(f)
            })
        )
    }
    
    r = callback( callInstanse );
    setOperTime(f)
    return r;
}

var Function_ = {
    resolve,
}

export default Function_;
