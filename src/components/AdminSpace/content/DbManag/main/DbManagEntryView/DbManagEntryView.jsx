import { useEffect, useState } from 'react';
import './DbManagEntryView.scss';
import { useAdminPanel } from '../../../../../../hooks/useAdminPanel';
import { TabWidgetPanel } from '../../../../../../base/components';
import AnybackLogo from '../../../../../svg/AnybackLogo/AnybackLogo';

import HotkeyDescription from '../../../contentComponents/HotkeyDescription/HotkeyDescription';
import useAdminSection from '../../../../../../hooks/useAdminSection';
import AddEntryForm from './AddEntryForm/AddEntryForm';
import EntryView from './EntryView/EntryView';


var moveEntryKeysWithCtrl = [
    "z", // next
    "Shift", // prev
]


var DbManagEntryView = () => {
    
    

    var adminPanel = useAdminPanel()
    var adminSection = useAdminSection();
    var currentEntryKey = adminSection.currentEntryKey
    
    var currentEntry = 
        adminPanel.current.entry
    
    var chosenEntries = adminSection.chosenEntries || [];

    var setChosenEntries = (newValue) => {
        adminSection.setValue("chosenEntries", newValue)
    }

    var onKeyDown = (event) => {

        if (!(event.ctrlKey))
            return
        
        if (event.key === "Enter") {
            
            adminPanel.setCurrent(p => {
                var newEntry = {
                    id: undefined,
                }

                setTimeout(() => setChosenEntries(prevChosenEntries => {
                    var newEntryId = prevChosenEntries.indexOf(p.entry)
                    prevChosenEntries.splice((( newEntryId + 1 ) || 0), 0, newEntry)

                    return [...prevChosenEntries];
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


    if (! ( adminSection.loaded ))
        return null

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
                <TabWidgetPanel
                    widgetEntries={chosenEntries}
                    entryTitleKey={currentEntryKey}

                    onSelect={(entry, event) => {
                        adminPanel.setCurrent(p => ({
                            ...p,
                            entry,
                            databaseName: entry.databaseName,
                            tableName: entry.tableName,
                        }));
                    }}

                    onClose={(entry, event) => {
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
                    }}
                    isSelectedEntry={(entry) => currentEntry === entry}

                    defaultTitle={
                        <span
                            style={{
                                color: 'white',
                                background: 'gray',
                                padding: '0 5px',
                                borderRadius: '5px'

                            }}
                        >
                            {">_"}
                        </span>
                    }
                />
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
                    ? (() => {

                        if (currentEntry.id === undefined) {
                            return (
                                <AddEntryForm
                                    style={{
                                        paddingTop: '20px',
                                        width: 'calc(100% - 20px)',
                                        paddingLeft: '20px',
                                    }}
                                />
                            )
                        }

                        return (
                            <EntryView
                                entry={currentEntry}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        )

                    })()
                    : (<>
                        <AnybackLogo
                            side="200px"
                            style={{
                                marginTop: '20px',
                                opacity: '.6',
                            }}
                        />
                        <HotkeyDescription
                            hotkeys={adminSection.hotkeys}
                        />
                        
                    </>)
                }
            </div>
        </article>
    )

}

export default DbManagEntryView;
