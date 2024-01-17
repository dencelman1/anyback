import { useCallback } from 'react';
import OpeningLever from '../../../base/components/OpeningLever';
import { useAdminPanel } from '../../../hooks/useAdminPanel';
import './RightSideBar.scss'

var RightSideBar = () => {

    var adminPanel = useAdminPanel()


    var onOpeningLeverClick = useCallback(() => {
        adminPanel.setOpened(prev => ({...prev, rightSideBar: !(prev.rightSideBar)}))
    }, [])

    return (
        <div
            className={(
                'rightSideBar'+
                (adminPanel.opened.rightSideBar ? "": " closed")
            )}
        >

            <OpeningLever
                onClick={onOpeningLeverClick}
            />
        </div>
    )
}

export default RightSideBar;
