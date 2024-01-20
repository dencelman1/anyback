import { useState } from 'react';
import './DbManagEntryView.scss';
import CrossIcon from '../../../../../svg/Cross/Cross';
import { useAdminPanel } from '../../../../../../hooks/useAdminPanel';

var testData =  Array.from({length: 210}, (v, id) => ({id, name: `${id}`}))

var DbManagEntryView = () => {
    var [chosenEntries, setChosenEntries] = useState(testData)
    var adminPanel = useAdminPanel()
    
    return (
        <article
            className="DbManag__entryView"
        >
            <div
                className="chosenEntries"
            >
                {
                    chosenEntries
                    .map(e => (
                        <div
                            className={(
                                "tabWidget"+
                                (adminPanel.current.entry === e ? 1: 1)
                            )}
                            
                        >
                            <span>
                                {"Lambada" + e.name}
                            </span>

                            <CrossIcon
                                side={16}
                            />

                        </div>
                    ))
                }
            </div>
            
        </article>
    )

}

export default DbManagEntryView;
