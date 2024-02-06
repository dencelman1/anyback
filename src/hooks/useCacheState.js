import { useEffect, useState } from "react";


var useCacheState = (defaultValue, key) => {
    defaultValue ||= ( null );
    
    var fromCache = () => {
        var v = decodeURIComponent(localStorage.getItem(key));
        if (v === 'undefined') {
            return undefined;
        }
        return JSON.parse(v)
    }
    var cache = (k, v) => {
        v = v === undefined ? 'undefined': encodeURIComponent(JSON.stringify(v))
        localStorage.setItem(k, v)
        return ( v );
    }
    var [state , setState] = useState(defaultValue);

    useEffect(() => {
        setState((prev) => {
            var v = fromCache();
            return [null, undefined].includes(v)
            ? prev
            : v
        })
    }, [])

    var setStateFull = (v) => {
        cache(key, v)
        setState(v)
        return v;
    }

    return [
        state,
        setStateFull,
    ]
}

export default useCacheState;
