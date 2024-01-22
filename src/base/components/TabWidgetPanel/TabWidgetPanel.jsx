import { useEffect, useRef } from "react";
import CrossIcon from "../../../components/svg/Cross/Cross";
import './TabWidgetPanel.scss'


var TabWidgetPanel = (
    widgetEntries,
    entryTitleKey,
    onSelect,
    onClose,
    selectedEntry,
    flexDirection,
) => {
    flexDirection ||= "row";

    var selectedEntryRef = useRef({})
    var containerRef = useRef(null)

    useEffect(() => {
        var container = containerRef.current
        var selectedBlock = selectedEntryRef.current
        if (!selectedBlock)
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
                    var isSelectedEntry = selectedEntry === entry

                    return <div
                        key={index}
                        className={(
                            "tabWidget" +
                            (isSelectedEntry ? " current": "")
                        )}
                        onClick={(event) => {
                            onSelect(entry, event)
                        }}
                        ref={isSelectedEntry ? selectedEntryRef: selectedEntryRef.current = null}
                    >
                        
                        <span>
                            {entry[entryTitleKey]}
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
