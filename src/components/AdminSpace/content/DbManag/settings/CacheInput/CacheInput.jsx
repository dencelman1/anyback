import CacheData from "../../../../../../api/local/CacheData/CacheData";
import useAdminSection from "../../../../../../hooks/useAdminSection";


var CacheInput = ({
    name,
    title,
    allowNeg,
    minValue,
    
}) => {
    allowNeg ||= false;
    minValue ||= 0;
    
    var adminSection = useAdminSection();


    return (
        <label
            style={{
                marginTop: '20px',
            }}
        >

            <input
                type="number"
                value={ adminSection[ name ] || minValue }
                style={{
                    marginRight: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '15px',
                }}

                onChange={(event) => {
                    var v;
                    CacheData[ name ] =
                        ( v = ( parseFloat( event.target.value ) || minValue ) );

                    if (!allowNeg) {
                        v = Math.abs( v );
                    }

                    adminSection.setValue( name, v );
                    event.target.value = v;
                }}
                
            />

            <span
                style={{
                    whiteSpace: 'nowrap'
                }}
            >
                {title}
            </span>

        </label>
    )

}

export default CacheInput;
