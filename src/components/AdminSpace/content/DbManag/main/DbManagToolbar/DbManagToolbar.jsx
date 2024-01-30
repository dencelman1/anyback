// import SearchInput from '../../../../../../base/builtIn/Input/SearchInput/SearchInput';

import './DbManagToolbar.scss';


var DbManagToolbar = () => {

    return (
        <div
            className="DbManag__toolbar"
        >
            <input
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        e.target.blur();
                    }
                }}
                style={{
                    margin: 'auto',
                    padding: '0 5px',
                    fontSize: '20px',
                    
                    lineHeight: '40px',
                    height: '40px',
                    width: '50%',
                    borderRadius: '2px',

                    margin: '0',
                }}
            />
        </div>
    )
}

export default DbManagToolbar;
