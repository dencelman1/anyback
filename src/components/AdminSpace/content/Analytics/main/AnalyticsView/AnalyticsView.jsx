import './AnalyticsView.scss';
import useAdminSection from '../../../../../../hooks/useAdminSection';
import AnalWidget from './AnalWidget/AnalWidget';


var AnalyticsView = () => {
    var adminSection = useAdminSection();


    
    return (
        <div
            className='AnalyticsView'
        >
            <AnalWidget
                name={"name"}
                formula={`
                    return ((1 + 1) * 4 )
                `}
                options={adminSection.options}

            />
        </div>
    )
}

export default AnalyticsView;
