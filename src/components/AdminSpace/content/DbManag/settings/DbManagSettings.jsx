import CacheData from '../../../../../api/local/CacheData/CacheData';
import { Button } from '../../../../../base/builtIn';
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
