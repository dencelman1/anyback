import { useEffect } from "react";
import useAdminSection from "../../../../../hooks/useAdminSection";
import { FormulaEditor, AnalyticsView } from "./index";
import "./AnalyticsMain.scss";


var AnalyticsMain = () => {
    var adminSection = useAdminSection();

    useEffect(() => {

        adminSection.finishLoad();
        
    }, [])

    return (
        <div
            className="AnalyticsMain"
        >

            <AnalyticsView />

            <FormulaEditor />

        </div>
    )
}

export default AnalyticsMain;
