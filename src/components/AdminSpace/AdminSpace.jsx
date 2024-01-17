import { useAdminPanel } from '../../hooks/useAdminPanel';
import './AdminSpace.scss';
import {
    RightSideBar,
    Main, 
    LeftSideBar,
} from './index'



var AdminSpace = () => {
    var adminPanel = useAdminPanel()
    
    return (
        <div className="adminSpace">
            <LeftSideBar />
            {
                adminPanel.isSectionChosen() && (
                    <>
                        <Main />
                        <RightSideBar />
                    </>
                )
            }
        </div>
    )
}

export default AdminSpace;
