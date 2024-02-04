import React, { useEffect, useMemo, useState } from "react";
import useAdminSection from "../../../../../hooks/useAdminSection";
import { FormulaEditor, AnalyticsView } from "./index";
import "./AnalyticsMain.scss";


var AnalyticsMain = () => {
    var adminSection = useAdminSection();
    
    var [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        adminSection.setValue(
            [
                "currentFormulaId",
                "editor",
                "formulas",
            ],
            [
                adminSection.cacheGet("currentFormulaId", -1),
                adminSection.cacheGet(
                    "editor",
                    {
                        opened: false,
                        value: ''
                    },
                    "localStorage"
                ),
                adminSection.cacheGet(
                    "formulas",
                    [],
                    "localStorage"
                ),
                
            ],
            () => {

                adminSection.setCachedKeys([
                    "currentFormulaId",
                ])
                adminSection.setLocalStorageCachedKeys([
                    "editor",
                    'formulas',
                ])
                adminSection.finishLoad();
                setIsLoading(false);

            }
        )
        
    }, [])


    var currentFormula = useMemo(() => {
        
        return (

            adminSection.formulas
            ?.filter(f => f.id === adminSection.currentFormulaId)
            [0]
            
        )
    }, [
        adminSection.currentFormulaId,
        adminSection.formulas,
    ]);

    if (isLoading) {
        return null;
    }

    return (
    
        <div
            className="AnalyticsMain"
        >

            <AnalyticsView
                adminSection={adminSection}
            />

            <FormulaEditor
                adminSection={adminSection}
                currentFormula={currentFormula}
            />

        </div>
    
    )
}

export default AnalyticsMain;
