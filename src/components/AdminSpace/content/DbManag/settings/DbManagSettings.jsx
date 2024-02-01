import CacheData from '../../../../../api/local/CacheData/CacheData';
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
            >
                <select
                    value={adminSection.currentEntryKey}
                    onChange={(event) => {

                        var v = event.target.value;
                        CacheData[`currentEntryKey__${adminSection.name}`] = v;
                        
                        adminSection.setValue(
                            "currentEntryKey",
                            v,
                        )

                    }}
                >
                    <option value="id">id</option>
                    {

                        adminSection.currentTable?.fields &&
                        adminSection.currentTable.fields
                        .map(f => {
                            return (
                                <option value={f.name}>{f.name}</option>
                            )
                        })
                    }
                </select>
            </Labeled>
        </div>
    )
}

export default DbManagSettings;
