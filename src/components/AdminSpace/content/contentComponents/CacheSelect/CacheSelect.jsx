import './CacheSelect.scss';
import { getColorByDataType } from "../../../../../base/components/TabWidgetPanel/TabWidgetPanel";
import useAdminSection from "../../../../../hooks/useAdminSection";
import Labeled from "../Labeled/Labeled";



var CacheSelect = ({
    cacheKey,
    title,
    options,

    onChange,

    type,
    adminSection,
}) => {
    adminSection ||= useAdminSection();

    return (
        <Labeled
            title={title}
            type={type || "string"}
        >
            <select
                className="CacheSelect"
                value={adminSection[cacheKey]}
                style={{
                    color: getColorByDataType( "string" )
                }}
                onChange={(event) => {
                    var newV = event.target.value;

                    if (onChange) {
                        onChange(newV)

                    }
                    else {
                        adminSection.setValue(
                            cacheKey,
                            newV,
                        )

                    }
                    

                }}
            >
                {
                    options.map((o, key) => (
                        
                        <option
                            key={key}
                            value={
                                typeof o === "string" ? o: o.value
                            }
                        >
                            {
                                typeof o === "string" ? o: o.title
                            }
                        </option>
                        
                    ))
                }
            </select>
        </Labeled>
    )
}

export default CacheSelect;
