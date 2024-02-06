import CacheData from "../../../../../api/local/CacheData/CacheData";
import { getColorByDataType } from "../../../../../base/components/TabWidgetPanel/TabWidgetPanel";
import { useAdminPanel } from "../../../../../hooks/useAdminPanel";
import Labeled from "../../../content/contentComponents/Labeled/Labeled";


export var getThemeValue = (theme) => {
    (!theme) && (theme = 'light');

    (theme === 'system') && (
        theme =
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? "dark"
            : "light"
    );
    return theme;

}

var ThemeSelect = () => {
    var adminPanel = useAdminPanel();

    return (
        <Labeled
            title="Theme"
            type="string"
        >
            <select
                className="CacheSelect"
                value={adminPanel.userData.theme}
                style={{
                    color: getColorByDataType( "string" )
                }}
                onChange={(event) => {
                    adminPanel.setUserData(p => ({
                        ...p,
                        theme: ( event.target.value ),
                    }))
                }}
            >
                {
                    (
                        [
                            {title: "Light", value: "light"},
                            {title: "Dark", value: 'dark'},
                            {title: "Same as on device", value: 'system'},
                        ]
                    ).map((o, key) => (
                        
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

export default ThemeSelect;
