import { useState } from 'react';
import './Select.scss';
import ArrowIcon from '../../../components/svg/Arrow/Arrow';





var Select = (

    {
        title,
        options,


        isSelect,
        style,
        onOpen,
        onClose,
        onChange,
        ...props
    }

) => {
    style ||= {},
    options ||= [];
    title ||= "";


    var [select, setSelect] = useState({
        opened: false,
        currentOption: null,
    })
    var newValue, closeOpenHandler;

    var isSelect = isSelect || ((option) => {
        return select.currentOption === option
    })

    return (
        <div
            {...props}
            style={style}
            className={(
                "Select" +
                (select.opened ? "": " closed")+
                (props.className ? ` ${props.className}`: "")
            )}
        >
            <div
                title={title}
                className='title'
                onClick={() => (
                    setSelect(p => {

                        newValue = !( p.opened );

                        (closeOpenHandler = (newValue ? onOpen : onClose)) && closeOpenHandler();

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
                    {title}
                </span>
            </div>

            <ul
                className="options"
            >
                {
                    options.map((o, key) => {
                        
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
                                    if (onChange){
                                        onChange(o);
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
