import { Cookie } from "../../../base/utils/index.js";

var get = Cookie.get;
var set = Cookie.update;


var CacheData = new Proxy(
    {},
    {
        set(target, prop, newValue, receiver) {

            if (newValue !== target[prop]) {
                target[prop] = set(prop, newValue);
            }
    
            return true;
            
        },

        get(target, prop, receiver) {
            return (
                target[prop] || ( target[prop] = get(prop) )
            )
        },
        
    }
)



export default CacheData;
