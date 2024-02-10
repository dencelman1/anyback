import { useCallback } from 'react';
import OpeningLever from '../../../base/components/OpeningLever/OpeningLever.jsx';
import { useAdminPanel } from '../../../hooks/useAdminPanel.js';
import './RightSideBar.scss'


var RightSideBar = () => {

    var adminPanel = useAdminPanel()


    var onOpeningLeverClick = useCallback(() => {
        adminPanel.setOpened(prev => ({...prev, rightSideBar: !(prev.rightSideBar)}))
    }, [])

    var currentSection = adminPanel.current.section

    if (!currentSection)
        return null

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

            {<currentSection.element.right />}
        </div>
    )
}

export default RightSideBar;
