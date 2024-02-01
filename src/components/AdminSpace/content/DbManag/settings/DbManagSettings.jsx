import CacheData from '../../../../../api/local/CacheData/CacheData';
import { getColorByDataType } from '../../../../../base/components/TabWidgetPanel/TabWidgetPanel';
import useAdminSection from '../../../../../hooks/useAdminSection';
import CacheInput from './CacheInput/CacheInput';
import './DbManagSettings.scss';
import Labeled from './Labeled/Labeled';


var DbManagSettings = () => {
    var adminSection = useAdminSection();

    return (
        <div
            className="DbManagSettings"
        >
            <CacheInput
                name="searchDebounceDelay"
                title="Search input typing debounce delay (ms)"
            />

            <CacheInput
                name="offset"
                title="Entries offset"
            />

            <CacheInput
                name="limit"
                title="Entries limit"
            />

            <Labeled
                title="Current entry key"
                type="string"
            >
                <select
                    value={adminSection.currentEntryKey}
                    style={{
                        color: getColorByDataType( "string" )
                    }}
                    onChange={(event) => {
                        
                        adminSection.setValue(
                            "currentEntryKey",
                            event.target.value,
                        )

                    }}
                >
                    <option value="id">id</option>
                    
                    {

                        adminSection.currentTable?.fields
                        ?.map((f, fI) => {
                            return (
                                <option
                                    value={f.name}
                                    key={fI}
                                >
                                    {f.name}
                                </option>
                            )
                        })

                    }
                </select>
            </Labeled>
        </div>
    )
}

export default DbManagSettings;
