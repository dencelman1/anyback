import { getColorByDataType } from "../../../../../../base/components/TabWidgetPanel/TabWidgetPanel";


var Labeled = ({
    title,
    type,
    

    children
}) => {
    type ||= 'number';

    return (
        <label
            style={{
                marginTop: '20px',
            }}
        >
            {children}

            <span
                style={{
                    marginLeft: '20px',
                    whiteSpace: 'nowrap',
                    color: getColorByDataType( type ),
                }}
            >
                {title}
            </span>

        </label>
    )
}

export default Labeled;
