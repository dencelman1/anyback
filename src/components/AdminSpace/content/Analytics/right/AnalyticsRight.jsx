import { Select } from '../../../../../base/builtIn';
import useAdminSection from '../../../../../hooks/useAdminSection';
import './AnalyticsRight.scss';


var AnalyticsRight = () => {
    var adminSection = useAdminSection();

    return (
        <div
            className='AnalyticsRight'
        >
            <Select
                style={{
                    width: '100%',
                }}
                title="Analytics"
                options={[
                    <Select
                        title={<><b>options</b> enviroment</>}
                        onChange={(o) => {
                            alert(o.value)
                        }}
                        options={
                            Object.entries(adminSection.adminPanel.options)
                            .map(([k ,v ], index) => {
                                return {
                                    title: k,
                                    type: typeof v,
                                    value: (
                                        typeof v === "function"
                                        ? v.toLocaleString()
                                        : (
                                            JSON.stringify(
                                                v,
                                                (key, value) => {
                                                    return (
                                                        typeof value === "function"
                                                        ? value.toLocaleString()
                                                        : value
                                                    )
                                                
                                                },
                                                2,
                                            )
                                        )
                                    ),
                                }
                            })
                        }
                    />

                ]}
                
                // isSelect,
                // style,
                // onOpen,
                // onClose,
                // onChange,
            />
        </div>
    )
}

export default AnalyticsRight;
