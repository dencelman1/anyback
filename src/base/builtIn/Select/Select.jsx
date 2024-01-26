import { useState } from 'react';
import './Select.scss';
import ArrowIcon from '../../../components/svg/Arrow/Arrow';





var Select = (

    props

) => {
    
    var [select, setSelect] = useState({
        opened: false,
        currentOption: null,
    })
    var newValue, closeOpenHandler;

    var isSelect = props.isSelect || ((option) => {
        return select.currentOption === option
    })

    return (
        <div
            className={(
                "Select" +
                (select.opened ? "": " closed")
            )}
        >
            <div
                title={props.title}
                className='title'
                onClick={() => (
                    setSelect(p => {

                        newValue = !( p.opened );

                        (closeOpenHandler = (newValue ? props.onOpen : props.onClose)) && closeOpenHandler();

                        return {
                            ...p,
                            opened: newValue,
                        }
                    })
                )}
            >
                <ArrowIcon
                    side="20px"
                />

                <span>
                    {props.title}
                </span>
            </div>

            <ul
                className="options"
            >
                {
                    props.options.map((o, key) => {
                        
                        if ("props" in o) {
                            return o
                        }

                        return (
                            <li
                                key={key}
                                className={(
                                    "option"+
                                    (
                                        isSelect(o) ? " current": ""
                                    )
                                )}
                                onClick={(event) => {
                                    event.stopPropagation();

                                    setSelect(p => ({...p, currentOption: o}))
                                    if (props.onChange){
                                        props.onChange(o);
                                    }
                                    
                                }}
                                title={o.title}
                            >
                                {o.title}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        
    )
}




export default Select;
