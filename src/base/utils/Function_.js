

function resolve (
    callInstanse,
    callback,
    onError,
) {
    onError ||= window.alert;

    if (Array.isArray(callInstanse)) {
        
        Promise.all( callInstanse )
        .then( callback )
        .catch(onError )

    }
    
    if (callInstanse instanceof Promise) {
        return (
            callInstanse
            .then(callback)
            .catch(onError)
        )
    }
    
    return callback(callInstanse)
}

var Function_ = {
    resolve,
}

export default Function_;
