import CrossIcon from "../../../components/svg/Cross/Cross";
import './TabWidgetPanel.scss'

var TabWidgetPanel = (
    widgetEntries,
    entryTitleKey,
    onSelect,
    onClose,
    selectedEntry,
) => {

    return (
        <div
            className="TabWidgetPanel"
        >
            {
                widgetEntries
                .map((entry, index) => (
                    <div
                        key={index}
                        className={(
                            "tabWidget" +
                            (selectedEntry === entry ? " current": "")
                        )}
                        onClick={(event) => {
                            onSelect(entry, event)
                        }}
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
                ))
            }
        </div>
    )
}

export default TabWidgetPanel;
