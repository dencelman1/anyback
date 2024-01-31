import CacheData from '../../../../../api/local/CacheData/CacheData';
import { CheckBox, FormInput } from '../../../../../base/builtIn';
import useAdminSection from '../../../../../hooks/useAdminSection';
import './DbManagSettings.scss';


var DbManagSettings = () => {
    var adminSection = useAdminSection();
    
    return (
        <div
            className="DbManagSettings"
        >
            
            <FormInput
                type="number"
                label="Search input typing debounce delay (ms)"
                value={adminSection.searchDebounceDelay}
                style={{
                    marginTop: '20px',
                }}

                onChange={(event) => {
                    var v;
                    CacheData.searchDebounceDelay =
                        ( v = ( Math.abs( parseFloat( event.target.value ) ) || 0 ) )

                    adminSection.setValue( "searchDebounceDelay", v )
                    event.target.value = v;

                }}
            />

            

            
        </div>
    )
}

export default DbManagSettings;
