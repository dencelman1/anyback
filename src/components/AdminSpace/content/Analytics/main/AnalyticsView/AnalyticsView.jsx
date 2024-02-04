import './AnalyticsView.scss';
import AnalWidget from './AnalWidget/AnalWidget';


var AnalyticsView = ({
    adminSection,
}) => {
    
    return (
        <div
            className="AnalyticsView default-scroll-bar column"
        >
            {
                Array.isArray(adminSection?.formulas)
                &&
                adminSection.formulas?.map((f, i) => {
                    return (
                        <AnalWidget
                            key={i}
                            formula={f}
                            adminSection={adminSection}
                            
                        />
                    )
                })
                || 'Add your first anal formula :)'
            }
        </div>
    )
}

export default AnalyticsView;
