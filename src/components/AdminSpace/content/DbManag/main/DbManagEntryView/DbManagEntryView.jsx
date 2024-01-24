import { useEffect, useState } from 'react';
import './DbManagEntryView.scss';
import { useAdminPanel } from '../../../../../../hooks/useAdminPanel';
import { TabWidgetPanel } from '../../../../../../base/components';
import AnybackLogo from '../../../../../svg/AnybackLogo/AnybackLogo';

import HotkeyDescription from '../../../contentComponents/HotkeyDescription/HotkeyDescription';


var moveEntryKeysWithCtrl = [
    "z", // next
    "Shift", // prev
]


var DbManagEntryView = () => {
    var [chosenEntries, setChosenEntries] = useState(
        Array.from({ length: 5 }, (v, id) => ({id, name: `${id}`}))
    )
    var currentEntryKey = 'name'
    var adminPanel = useAdminPanel()
    
    var currentEntry = 
        adminPanel.current.entry
    
    
    var onKeyDown = (event) => {

        if (!(event.ctrlKey))
            return
        
        if (event.key === "Enter") {
            
            adminPanel.setCurrent(p => {

                var uniqueId = new Date().getTime()
                var newEntry = {
                    id: uniqueId,
                    name: `${uniqueId}`,
                }

                setTimeout(() => setChosenEntries(prev => {
                    var newEntryId = prev.indexOf(p.entry)
                    prev.splice((( newEntryId + 1 ) || 0), 0, newEntry)

                    return [...prev];
                }), 0)

                return {
                    ...p,
                    entry: newEntry,
                }
            })

        }
        else if (event.key === "Backspace") {

            adminPanel.setCurrent(p => {
                if (p.entry === null)
                    return p
                return {...p, entry: null}
            })

        }
        
        else if (event.key === "Delete") {

            adminPanel.setCurrent(p => {
                var currentEntry = p.entry
                if (!currentEntry)
                    return p

                setTimeout(() => setChosenEntries(prev => {
                    var i = prev.indexOf(currentEntry)

                    var newChosenEntries = (
                        prev
                        .filter(e => e !== currentEntry)
                    )
                    

                    setTimeout(() => {
                        adminPanel.setCurrent(p => ({
                            ...p,
                            entry: (
                                newChosenEntries[i] ||
                                newChosenEntries[i - 1] ||
                                null
                            ),
                        }))
                    }, 0)

                    return (
                        newChosenEntries
                    )
                }), 0)

                return (p)
            })

        }
        
        else if (moveEntryKeysWithCtrl.includes(event.key)) {
            
            setChosenEntries(chosenEntries => {

                setTimeout(() => adminPanel.setCurrent(p => (
                    {
                        ...p,
                        entry:
                            (
                                chosenEntries[
                                    chosenEntries.indexOf(p.entry)
                                    +
                                    (event.shiftKey ? -1: 1)
                                ] ||
                                chosenEntries[(event.shiftKey ? (chosenEntries.length - 1): 0)]
                            )
                    })
                ) ,0)
                
                return chosenEntries;

            })

        }
    }

    useEffect(() => {

        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    return (
        <article
            className="DbManag__entryView"
        >   
            <div
                style={{
                    width: '100%',
                    height: 'fit-content',
                }}
            >
            {
                TabWidgetPanel(
                    chosenEntries,
                    currentEntryKey,

                    (entry, event) => {
                        adminPanel.setCurrent(p => ({...p, entry }));
                    },

                    (entry, event) => {
                        adminPanel.setCurrent(p => {
                            var currentEntry = p.entry;
                            var isDeletingChosen = currentEntry === entry;

                            var newChosenEntries = chosenEntries.filter(e => e !== entry)
                            
                            setTimeout(() => setChosenEntries(newChosenEntries), 0)

                            return {
                                ...p,
                                entry: isDeletingChosen ? (newChosenEntries[0]): (currentEntry),
                            }
                        });
                    },
                    currentEntry,
                )
            }
            </div>  

            <div
                style={{
                    width: '100%',
                    height: `calc(100% - 38px)`,

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'left',

                    overflow: 'auto',
                }}
                className="default-scroll-bar column"
            >
                {
                    currentEntry
                    ? null
                    : (<>
                        <AnybackLogo
                            side="200px"
                            style={{
                                // margin: 'auto',
                                marginTop: '20px',
                                opacity: '.6',
                            }}
                        />
                        <HotkeyDescription
                            hotkeys={adminPanel.sections[0].hotkeys}
                        />
                        
                    </>)
                }
            </div>
        </article>
    )

}

export default DbManagEntryView;
