import { getColorByDataType } from "../../../../../base/components/TabWidgetPanel/TabWidgetPanel.jsx";
import useAdminSection from "../../../../../hooks/useAdminSection.js";
import Labeled from "../Labeled/Labeled.jsx";



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
                    color: getColorByDataType( type )
                }}

                value={ adminSection[ name ] || minValue }
                onChange={(event) => {
                    var v = ( parseFloat( event.target.value ) || minValue );
                    
                    if (!allowNeg) {
                        v = Math.abs( v );
                    }

                    adminSection.setValue( name, v );
                }}
                
            />

        </Labeled>
    )

}

export default CacheInput;
