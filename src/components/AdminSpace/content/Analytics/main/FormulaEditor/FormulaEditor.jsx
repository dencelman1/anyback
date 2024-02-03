import { useState } from 'react';
import { Button } from '../../../../../../base/builtIn/index';
import JsEditor from '../../../../../../base/builtIn/Textarea/JsEditor/JsEditor';
import ArrowIcon from '../../../../../svg/Arrow/Arrow';
import './FormulaEditor.scss';


var FormulaEditor = () => {
    var [editor, setEditor] = useState({
        opened: false,
    })

    return (
        <div
            className={(
                "FormulaEditor"+
                (editor.opened ? " opened": '')
            )}
        >
            <Button
                className="closeOpen"
                onClick={(event) => {
                    setEditor(p => ({...p, opened: !(p.opened)}))
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
                style={{
                    width: '85%',
                    height: '70%',
                }}
            />
        </div>
    )
}

export default FormulaEditor;
