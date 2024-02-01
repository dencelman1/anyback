import CacheData from "../../../../../../api/local/CacheData/CacheData";
import useAdminSection from "../../../../../../hooks/useAdminSection";
import Labeled from "../Labeled/Labeled";



var CacheInput = ({
    name,
    title,
    allowNeg,
    minValue,
    type,

}) => {

    type ||= 'number';
    allowNeg ||= false;
    minValue ||= 0;
    
    var adminSection = useAdminSection();

    return (
        <Labeled
            title={title}
        >

            <input
                type={type}
                
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '15px',
                }}

                value={ adminSection[ name ] || minValue }
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

        </Labeled>
    )

}

export default CacheInput;
