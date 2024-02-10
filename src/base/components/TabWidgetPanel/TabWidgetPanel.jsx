import { useEffect, useRef } from "react";
import CrossIcon from "../../../components/svg/Cross/Cross.jsx";
import './TabWidgetPanel.scss'


export var getColorByDataType = (
    type,
) => {
    return ({
        boolean: "rgb(31,54,162)",
        number: 'rgb(129,91,31)',
        string: 'rgb(203,21,21)',
        object: 'gray',
        function: 'rgb(206,68,93)',
    })[type]
}



var TabWidgetPanel = ({
    widgetEntries,
    entryTitleKey,
    onSelect,
    onClose,
    isSelectedEntry,
    flexDirection,

    defaultTitle,
}) => {

    defaultTitle ||= "....";
    flexDirection ||= "row";

    var selectedEntryRef = useRef({})
    var containerRef = useRef(null)

    useEffect(() => {
        var container = containerRef.current
        var selectedBlock = selectedEntryRef.current
        
        if ( !( selectedBlock && selectedBlock.getBoundingClientRect ))
            return
        
        var currentBlockRect = selectedBlock.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();

        container.scrollLeft +=
            (currentBlockRect.left + currentBlockRect.width / 2) - (containerRect.left + containerRect.width / 2);

        container.scrollTop +=
            (currentBlockRect.top + currentBlockRect.height / 2) - (containerRect.top + containerRect.height / 2);

    }, [
        selectedEntryRef,
        selectedEntryRef.current,
    ])

    return (
        <div
            className={`TabWidgetPanel default-scroll-bar ${flexDirection} thin`}
            ref={containerRef}
        >
            {
                widgetEntries
                .map((entry, index) => {
                    var v ;

                    var isSelectedEntry_ = isSelectedEntry(entry)
                    var titleText =
                        entry.id === undefined
                        ? defaultTitle
                        : ( (v = entry[entryTitleKey])?.toString() || (v= entry.id)?.toString() );

                    return <div
                        key={index}
                        className={(
                            "tabWidget" +
                            (isSelectedEntry_ ? " current": "")
                        )}
                        onClick={(event) => {
                            onSelect(entry, event)
                        }}
                        ref={isSelectedEntry_ ? selectedEntryRef: (
                            selectedEntryRef.current = null
                        )}
                    >
                        
                        <span
                            title={titleText}
                            style={{
                                color: getColorByDataType(typeof v)
                            }}
                            
                        >
                            {titleText}
                        </span>

                        <CrossIcon
                            side={16}
                            onClick={(event) => {
                                event.stopPropagation()
                                event.preventDefault();
                                onClose(entry, event)
                            }}
                        />

                    </div>
                })
            }
        </div>
    )
}

export default TabWidgetPanel;
