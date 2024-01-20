import { useState } from 'react';
import './DbManagEntryView.scss';
import { useAdminPanel } from '../../../../../../hooks/useAdminPanel';
import { TabWidgetPanel } from '../../../../../../base/components';


var testData =  Array.from({length: 50   }, (v, id) => ({id, name: `${id}`}))


var DbManagEntryView = () => {
    var [chosenEntries, setChosenEntries] = useState(testData)
    var currentEntryKey = 'name'
    var adminPanel = useAdminPanel()

    var currentEntry = adminPanel.current.entry

    return (
        <article
            className="DbManag__entryView"
        >
            {
                TabWidgetPanel(
                    chosenEntries,
                    currentEntryKey,
                    (entry, event) => {
                        adminPanel.setCurrent(p => ({...p, entry }));
                        // TODO: до того елемента который выбран скролл
                    },
                    (entry, event) => {
                        var isDeletingChosen = currentEntry.id === entry.id

                        var newChosenEntries = chosenEntries.filter(e => e !== entry)
                        
                        if (isDeletingChosen) {
                            adminPanel.setCurrent(p => ({
                                ...p,
                                entry: (newChosenEntries[0]),
                            }));
                            event.currentTarget.parentElement.parentElement.    scroll(0, 0)
                        }

                        setChosenEntries(newChosenEntries);
                        
                        
                    },
                    currentEntry,
                )
            } 
        </article>
    )

}

export default DbManagEntryView;
