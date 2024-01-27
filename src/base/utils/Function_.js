

function resolve (
    callInstanse,
    callback,
    onError,
) {
    onError = window.alert;
    
    if (callInstanse instanceof Promise) {
        return (
            callInstanse
            .then(callback)
            .catch(onError || callback)
        )
    }
    
    return callback(callInstanse)
}

var Function_ = {
    resolve,
}

export default Function_;
