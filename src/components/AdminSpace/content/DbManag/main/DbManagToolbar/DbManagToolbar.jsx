import { useEffect, useState } from 'react';
import './DbManagToolbar.scss';
import useDebounce from '../../../../../../hooks/useDebounceState';
import useAdminSection from '../../../../../../hooks/useAdminSection';


var DbManagToolbar = () => {
    var adminSection = useAdminSection();

    var [searchInput, setSearchInput] = useState({
        value: '',

        right: true,
        queryObj: null,
    });

    var makeRequest = useDebounce(() => {
        console.log(1)
    }, adminSection.searchDebounceDelay)

    useEffect(() => {

        makeRequest()

    }, [searchInput.value])

    
    var onChange = (event) => {

        setSearchInput(p => ({
            ...p,
            value: event.target.value,
        }));

    }

    return (
        <div
            className="DbManag__toolbar"
        >
            <div
                style={{
                    marginRight: '10px',
                    fontSize: '30px',
                }}
            >
                {
                    searchInput.right 
                    ? "✔️"
                    : "❌"
                }
            </div>

            <textarea
                onChange={onChange}
                value={searchInput.value}

                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        e.target.blur();
                    }
                }}
                style={{
                    resize: 'none',
                    margin: 'auto',
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
        </div>
    )
}

export default DbManagToolbar;
