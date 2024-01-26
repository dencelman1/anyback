

function resolve (
    callInstanse,
    callback,
) {

    if (callInstanse instanceof Promise) {
        return (
            callInstanse
            .then(callback)
        )
    }
    
    return (
        callback(callInstanse)
    )

}

var Function_ = {
    resolve,
}

export default Function_;
