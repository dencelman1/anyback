import { Button } from '../../../../../../base/builtIn/index';
import JsEditor from '../../../../../../base/builtIn/Textarea/JsEditor/JsEditor';
import ArrowIcon from '../../../../../svg/Arrow/Arrow';
import './FormulaEditor.scss';
import AddIcon from '../../../../../svg/Add/Add';
import RemoveIcon from '../../../../../svg/Remove/Remove';
import { useCallback, useEffect } from 'react';
import HelpIcon from '../../../../../svg/Help/Help';
import { useAdminPanel } from '../../../../../../hooks/useAdminPanel';


var FormulaEditor = ({
    adminSection,
    currentFormula,

}) => {
    var adminPanel = useAdminPanel();

    var createFormula = ( formula ) => {
        var id = new Date().getTime()

        var newFormula = {
            id: id,
            name: `${id}`, // TODO: custom window.prompt();
            formula,
        };
        
        
        adminSection.setValue(
            [
                'formulas',
                "currentFormulaId"
            ],
            [
                (prev) => (
                    [
                        ...prev,
                        newFormula,
                    ]
                ),
                ( id ),
            ]
        )
    }

    var setNewValue = useCallback(( newV ) => {
        
        adminSection.setValue("formulas", p => p.map(f => {

            return (
                f !== currentFormula
                ? f
                : ({
                    ...f,
                    formula: newV,
                })
            )
        }))
        
    }, [
        currentFormula,
    ])

    var removeFormula = () => {
        adminSection.setValue('formulas', (prev) => {
                            
            var newV = prev.filter(f => (
                currentFormula?.id !== f.id
            ));
            
            if (newV.length > 0) {
                setTimeout(() => {

                    adminSection.setValue(
                        "currentFormulaId",
                        ( newV[newV.length - 1].id )
                    )

                }, 4)
            }

            return newV;

        })
    }


    useEffect(() => {
        adminSection.setValue("editor", (p) => ({
            ...p,
            value: ( currentFormula?.formula || "" ),
        }))

    }, [
        ( currentFormula?.id )
    ])

    

    return (
        <div
            className={(
                "FormulaEditor"+
                (adminSection.editor?.opened ? " opened": '')
                
            )}
        >
            <Button
                className="closeOpen"
                onClick={() => {
                    adminSection?.setValue("editor", p => (
                        {...p, opened: !( p.opened ) }
                    ))
                }}
                style={{
                    position: 'absolute',
                    bottom: "calc(100% - 25px)",
                }}
            >
                <ArrowIcon
                    side="25px"
                />
            </Button>
            
            <JsEditor
                value={adminSection.editor?.value || ""}
                onChange={(event) => (
                    adminSection.setValue("editor", (p) => {
                        return {
                            ...p,
                            value: event.target.value,
                        }
                    })
                )}
                style={{
                    width: '80%',
                    height: '200px',
                }}
                onKeyDown={(event) => {
                    var k = event.key;
                    
                    if (k === 'Tab') {
                        event.preventDefault();

                        var input = event.target;
                        var cursorPosition = input.selectionStart;
                        var value = (
                            input.value.substring(0, cursorPosition) +
                            "    " +
                            input.value.substring(cursorPosition)
                        )
                        
                        
                        adminSection.setValue(
                            "editor",
                            (p) => (
                                {
                                    ...p,
                                    value,
                                }
                            ),
                            () => {
                                input.setSelectionRange(cursorPosition + 4, cursorPosition + 4);

                            }
                        )
                        return

                    }
                    

                    if (!(event.ctrlKey)) {
                        return
                    }
                    
                    if (k === 's') {
                        event.preventDefault();
                        return setNewValue( event.target.value );

                    }
                    else if (k === "Enter") {
                        event.preventDefault();
                        return createFormula( currentFormula ? "": event.target.value );

                    }
                    
                }}
                
            />

            <div
                className="editButtons"
            >
                <Button
                    onClick={(event) => {
                        
                        createFormula( event.target.value );

                    }}
                >
                    <AddIcon side="40px" />
                </Button>

                <Button
                    onClick={() => {

                        removeFormula();

                    }}
                >
                    <RemoveIcon side="40px" />
                </Button>

                <Button
                    onClick={() => {
                        var hotkeys = adminPanel.current.section.hotkeys;

                        var m = "Hotkeys:\n\n"+
                            (
                                hotkeys.map(h => {
                                    return `${h.keys.join(" + ")} - ${h.desc}`
                                }).join("\n")
                                
                            );
                        alert( m )
                    }}
                >
                    <HelpIcon
                        side="40px"
                    />
                </Button>
            </div>
        </div>
    )
}

export default FormulaEditor;
