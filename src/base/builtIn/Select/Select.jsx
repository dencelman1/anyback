import { useState } from 'react';
import './Select.scss';
import Text from '../../utils/Text';


var Select = (

    props

) => {
    
    var [select, setSelect] = useState({
        opened: false,
        currentOption: null,
    })
    
    return (
        <div
            className="Select"
        >
            <p
                title={props.title}
                className='title'
            >
                {Text.getLimited(props.title, 10)}
            </p>
            <ul
                className="options"
            >
                {
                    props.options.map((o, key) => {
                        return <li
                            key={key}
                            className="option"
                            onClick={() => {
                                if (props.onChange){
                                    props.onChange(o);
                                }
                                setSelect(p => ({...p, currentOption: o}))
                            }}
                            title={o.title}
                        >
                            {Text.getLimited(o.title, 10)}
                        </li>
                    })
                }
            </ul>
        </div>
        
    )
}

export default Select;
