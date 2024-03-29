import { useEffect, useState } from 'react';
import './DbManagToolbar.scss';
import useDebounce from '../../../../../../hooks/useDebounce.js';
import useAdminSection from '../../../../../../hooks/useAdminSection.js';
import CheckMarkIcon from '../../../../../svg/CheckMark/CheckMark.jsx';
import CrossIcon from '../../../../../svg/Cross/Cross.jsx';

import JsEditor from '../../../../../../base/builtIn/Textarea/JsEditor/JsEditor.jsx';
import TimeIcon from '../../../../../svg/Time/Time.jsx';


var DbManagToolbar = () => {
    var adminSection = useAdminSection();
    var adminPanel = adminSection.adminPanel;


    var [searchInput, setSearchInput] = useState({
        value: '',

        right: true,
        queryObj: null,
    });

    var getQueryObj = ( value ) => {
            
        return (
            JSON.parse(
                JSON.stringify(

                    eval(
                        ` ( { ${value} } )`
                    ),

                    null,
                    0
                )
            )
        )
    }

    var setQueryObj = ( value ) => {

        new Promise((res, rej) => {

            res( getQueryObj( value ) );

        })
        .then((queryObj) => {

            adminSection.setValue("queryObj", queryObj);
            
            setSearchInput(p => ({
                ...p,
                right: true,
                queryObj,
            }))

        })
        .catch(
            () => {

                setSearchInput(p => ({
                    ...p,
                    right: false,
                    queryObj: null,
                }))

            }
        )

    }


    var makeRequest = useDebounce(() => {

        adminSection.updateEntries(
            adminPanel.current.databaseName,
            adminPanel.current.tableName,
        );
        
    }, ( adminSection.searchDebounceDelay ))


    useEffect(() => {

        if (searchInput.right) {
            makeRequest()
        }

    }, [searchInput.queryObj])

    
    var onChange = (event) => {

        setSearchInput(p => ({...p, value: event.target.value }))
        setQueryObj( event.target.value )
        
    };
    
    return (
        <div
            className="DbManag__toolbar "
        >
            <div
                style={{
                    marginRight: '10px',
                    userSelect: 'none',
                    marginLeft: 'auto'
                }}
            >
                {
                    searchInput.right 
                    ? <CheckMarkIcon fill={"rgb(40,219,16)"} side={"40px"} />
                    : <CrossIcon fill={"red"} side={"40px"} />
                }
            </div>

            <JsEditor
                onChange={onChange}
                value={searchInput.value}
                spellCheck={false}

                onKeyDown={(e) => {
                    e.key === "Escape" && (
                        e.target.blur()
                    );

                }}
                style={{
                    resize: 'none',
                    padding: '5px',
                    fontSize: '15px',
                    
                    lineHeight: '15px',
                    height: '40px',
                    width: '50%',
                    borderRadius: '2px',
                    border: '1px solid gray',
                    
                    margin: '0',
                }}
            />


            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: '20px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    cursor: 'pointer',
                }}
                
                onClick={(event) => {
                    var s = dbManagOperTime.textContent
                    window.alert(
                        <>The last operation took<br/>{s} seconds to process</>
                    )
                }}
            >

                <TimeIcon
                    side="40px"
                    style={{
                        cursor: 'pointer',
                    }}
                />

                <div
                    id="dbManagOperTime"
                    style={{
                        display: 'none'
                    }}
                >
                    0.000
                </div>
                
            </div>
        </div>
    )
}

export default DbManagToolbar;
