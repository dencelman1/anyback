import { useEffect } from "react";
import useAdminSection from "../../../../../hooks/useAdminSection";


var AnalyticsMain = () => {
    var adminSection = useAdminSection();

    useEffect(() => {
        adminSection.finishLoad();
        
    }, [])

    return (
        <></>
    )
}

export default AnalyticsMain;
