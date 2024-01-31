import CacheInput from './CacheInput/CacheInput';
import './DbManagSettings.scss';


var DbManagSettings = () => {
    // var adminSection = useAdminSection();

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

        </div>
    )
}

export default DbManagSettings;
