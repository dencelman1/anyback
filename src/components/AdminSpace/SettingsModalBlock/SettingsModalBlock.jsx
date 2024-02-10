import { useAdminPanel } from '../../../hooks/useAdminPanel.js';
import SettingsIcon from '../../svg/Settings/Settings.jsx';
import GlobalSettings from './GlobalSettings/GlobalSettings.jsx';
import './SettingsModalBlock.scss';


var NotIndicatedSettings = () => (
    <div
        style={{
            padding: '10px',
            textAlign: 'center',
        }}
    >
        Not indicated
    </div>
)

var SettingsModalBlock = ({
    isOpened,
    ...props
}) => {
    var adminPanel = useAdminPanel();
    var currentSection = adminPanel.current.section;
    
    var SettingsContent = (
        (currentSection === null)
        ? (
            GlobalSettings
        )
        : (
            ( currentSection?.element?.settings ) ||
            ( NotIndicatedSettings )
        )
    );

    
    
    return (
        <div
            {...props}

            className={(
                "SettingsModalBlock"
                + ( isOpened ? ' opened' : '' )
            )}
            
            style={{
                ...(props.style || {}),
                display: isOpened ? "flex": 'none'
            }}
        >
            <h2
                className='title'
            >
                {
                    currentSection
                    ? ( `Settings ${ currentSection?.name || "is unknown" }` )
                    : ( "Global settings" )
                }
                <SettingsIcon
                    side="1.5em"
                />
            </h2>
            
            <div
                className="SettingsContent default-scroll-bar column row"
            >
                <SettingsContent />
            </div>
            
        </div>
    )
}

export default SettingsModalBlock;
