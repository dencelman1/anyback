import { useMemo } from 'react';
import { Input } from '../../../../../base/builtIn';
import './DbManagRight.scss';
import { useAdminPanel } from '../../../../../hooks/useAdminPanel';
import Select from '../../../../../base/builtIn/Select/Select';



var DbManagRight = () => {
    var adminPanel = useAdminPanel()

    var navInputQueries = useMemo(() => ({
        style: {
            // margin: 'auto auto 10px auto',
            marginBottom: '10px',
            height: "30px",
            lineHeight: '30px',
            fontSize: '20px',
            // width: '100%',
        },
    }), [])

    function isRightValue(
        currentStateName,
        newValue
    )  {

        return (
            newValue === "MY_DATABASE"
        );

    }

    return (
        <div
            className="DbManagMain__right"
        >
            <p
                className="navInputs"
            >
                {[
                    {
                        placeholder: 'Database',
                        currentStateName: "databaseName",
                    },
                    {
                        placeholder: 'Table',
                        currentStateName: "tableName",
                    },
                    {
                        placeholder: 'Entry',
                        currentStateName: "entry",
                    },
                ].map(data => {
                    var currentStateName = data.currentStateName
                    var isRightStateValue = (value) => isRightValue(currentStateName, value)
                    return (
                        <Input
                            {...data}
                            value={adminPanel.current[currentStateName] || "Unknown"}
                            onChange={(event) => {
                                return (
                                    adminPanel.setCurrent(p => ({
                                        ...p,
                                        [currentStateName]: event.target.value}
                                    ))
                                )
                            }}
                            onBlur={(event) => {
                                adminPanel.setCurrent(p => ({
                                    ...p,
                                    [currentStateName]:
                                        isRightStateValue(event.target.value)
                                        ? event.target.value
                                        : (""),
                                }))

                            }}
                            onKeyDown={(event) => {
                                if ( event.key !== "Enter" ) {
                                    return
                                }

                                adminPanel.setCurrent(p => ({
                                    ...p,
                                    [currentStateName]:
                                        isRightStateValue(event.target.value)
                                        ? event.target.value
                                        : (""),
                                }))
                                

                                
                            }}
                            
                            {...navInputQueries}
                        />
                    )

                })}
            </p>


            <Select
                options={[
                    { title: "Database1", value: 'dtbs1' },
                    { title: "Database2", value: 'dtbs2' },
                ]}
                title={"Databases"}
                onChange={(option) => {
                    console.log(JSON.stringify(option, null , 2))
                }}
            />

        </div>
    )
}

export default DbManagRight;
