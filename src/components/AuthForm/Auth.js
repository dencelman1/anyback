import { Cookie } from "../../base/utils";


function setUserResult(
    result,

    onAuth,
    onError,
) {

    var setResult = (r) =>
        setUserResult(r, onAuth, onError)

    if (result instanceof Promise) {
        result
        .then((value) => {
            setResult(value)
        })
        .catch(error => {
            onError(error)
        })
    }

    
    else if (typeof result === "boolean") {
        onAuth(result)
    }
    else if (typeof result === "string") {
        onAuth(true);
        Cookie.update("authToken", result);
    }

}

var Auth = {
    setUserResult,
}

export default Auth;
