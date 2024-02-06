import { Button } from '../../../../../base/builtIn';
import useAdminSection from '../../../../../hooks/useAdminSection';
import CacheInput from '../../contentComponents/CacheInput/CacheInput';
import CacheSelect from '../../contentComponents/CacheSelect/CacheSelect';
import './DbManagSettings.scss';


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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px'
                }}
            >
                <CacheInput
                    name="offset"
                    title="Entries offset"
                    minValue={0}
                />

                <CacheInput
                    name="limit"
                    title="Entries limit"
                    minValue={0}
                />
            </div>

            <div
                style={{
                    marginTop: '20px',
                }}
            >
                <Button
                    className="nav"
                    onClick={() => {
                        var delay = adminSection.limit - adminSection.offset;
                        if ( (adminSection.offset  < delay) || ( delay === 0) )
                            return

                        adminSection.setValue(
                            [
                                "offset",
                                "limit"
                            ],
                            [
                                ( adminSection.offset - delay ),
                                ( adminSection.limit - delay ),
                                
                            ]
                        )
                    }}
                >
                    {"<"}
                </Button>
                <Button
                    className="nav"
                    style={{
                        marginLeft: '10px'
                    }}
                    onClick={() => {
                        var delay = adminSection.limit - adminSection.offset;
                        
                        adminSection.setValue(
                            [
                                "offset",
                                "limit"
                            ],
                            [
                                ( adminSection.offset + delay ),
                                ( adminSection.limit + delay ),
                                
                            ]
                        )
                    }}
                >
                    {">"}
                </Button>
            </div>
            
            <CacheSelect
                cacheKey='currentEntryKey'
                title="Current entry key"
                adminSection={adminSection}
                options={[
                    'id',
                    ...(
                        (adminSection.currentTable?.fields || [])
                        .map(( f ) => ( f.name )))
                ]}

            />

        </div>
    )
}

export default DbManagSettings;
