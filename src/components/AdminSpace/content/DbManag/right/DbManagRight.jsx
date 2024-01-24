import { useMemo } from 'react';
import { Input } from '../../../../../base/builtIn';
import './DbManagRight.scss';


var DbManagRight = () => {

    var navInputStyles = useMemo(() => ({
        margin: 'auto auto 10px auto',
        
        height: "30px",
        lineHeight: '30px',
        fontSize: '20px',
        width: '60%',
    }), [])

    return (
        <div
            className="DbManagMain__right"
        >
            <p
                className="navInputs"
            >
                <Input
                    style={navInputStyles}
                    placeholder="Database"
                />
                <Input
                    placeholder="Table"
                    style={navInputStyles}
                />
                <Input
                    placeholder="Entry"
                    style={navInputStyles}
                    
                />
            </p>

            
        </div>
    )
}

export default DbManagRight;
