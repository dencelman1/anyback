import { Cookie } from "../../base/utils"

var get = Cookie.get;
var set = Cookie.update;


var CacheData = new Proxy(
    {},
    {
        set(target, prop, newValue, receiver) {
            return (
                newValue !== target[prop] && ( target[prop] = set(prop, newValue) ) || true
            );
        },

        get(target, prop, receiver) {
            return (
                target[prop] || ( target[prop] = get(prop) )
            )
        },
        
    }
)



export default CacheData;
