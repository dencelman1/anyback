import { useEffect } from "react";
import useAdminSection from "../../../../../hooks/useAdminSection";


var AnalyticsMain = () => {
    var adminSection = useAdminSection();

    useEffect(() => {
        console.log("AnalyticsMain")
        setTimeout(() => adminSection.finishLoad(), 2000)
    }, [])

    return (
        <></>
    )
}

export default AnalyticsMain;
