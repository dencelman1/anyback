import Analytics from "./Analytics/Analytics";
import DbManag from "./DbManag/DbManag";



var adminSections = [
    {
        name: "DbManag",
        title: "Database management",
        element: DbManag,
    },
    {
        name: "Analytics",
        title: "Analytics",
        element: Analytics,
    },
]

export default adminSections;
