import { Cookie } from "../../base/utils";



var tokenKey = "authToken"
var tokenValue = undefined;

var AuthToken = {
    value: tokenValue,
    get: () => {
        if (tokenValue)
            return tokenValue

        return tokenValue = Cookie.get(tokenKey);
    },
    update: (value) => {
        Cookie.update(tokenKey, tokenValue = value)
    },
    delete: () => {
        Cookie.delete(tokenKey)
        tokenValue = undefined;
    },
}


function checkUserResult(
    result,

    onAuth,
    onError,
) {
    if (typeof result === 'boolean') {
        return onAuth(result);
    }

    else if (result instanceof Promise) {
        return (
            result
            .then((isRight) => {
                checkUserResult(isRight, onAuth, onError)
            })
            .catch(onError)
        )
    }

}


function setUserResult(
    result,

    onAuth,
    onError,
) {

    var setResult = (r) =>
        setUserResult(r, onAuth, onError)

    if (result instanceof  Promise) {
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
        AuthToken.update(result)
    }
}




var Auth = {
    set: setUserResult,
    check: checkUserResult,

    token: AuthToken,
}

export default Auth;
