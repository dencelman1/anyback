import { useCallback } from 'react';
import { Select } from '../../../../../base/builtIn';
import useAdminSection from '../../../../../hooks/useAdminSection';
import './AnalyticsRight.scss';


var AnalyticsRight = () => {
    var adminSection = useAdminSection();

    var includesTitle = useCallback((k, getKey) => {
        getKey ||= ( k => k );
        
        return (
            `${k}${adminSection.editor?.value?.includes(getKey(k)) ? " ✅": ""}`
            )
    }, [adminSection.editor?.value]);


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
                                    title: includesTitle(k, ( k ) => ( `options.${k}` )),
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
                    />,

                    <Select
                        title="Statements"
                        options={[
                            {title: includesTitle("return"), },
                            {title: includesTitle("res"), },
                        ]}
                    />,

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
