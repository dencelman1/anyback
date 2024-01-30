import { useAdminPanel } from '../../../hooks/useAdminPanel';
import SettingsIcon from '../../svg/Settings/Settings';
import './SettingsModalBlock.scss';


var SettingsModalBlock = ({
    isOpened,
    ...props
}) => {
    var adminPanel = useAdminPanel();
    var currentSection = adminPanel.current.section;

    
    return (
        <div
            {...props}
            className={(
                "SettingsModalBlock default-scroll-bar row column"
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
                    ? (`Settings ${currentSection.name}`)
                    : "Global settings"
                }
                <SettingsIcon
                    side="1.5em"
                />
            </h2>
        </div>
    )
}

export default SettingsModalBlock;
