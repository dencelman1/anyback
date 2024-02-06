import { useEffect, useMemo, useState } from 'react';
import './AnalWidget.scss';
import Function_ from '../../../../../../../base/utils/Function_';
import { allowedEntryDataTypes } from '../../../../../../../config';

var defaultValue = {
    value: "сalculation...",
    calculated: false,
    error: false,
}

var fullFormula = ( formula ) => {
    if (typeof formula !== 'string') {
        return "(() => (`CHECK_CODE`))"
    }
    
    if ( ( /(res|rej)\s*\(\s*[^)]*\s*\)/ ).test(formula) ) {
        return (
            `
                new Promise((res, rej) => {
                    ${formula}

                })
            `
        )
    }
    
    return (
        `(
            () => {
                ${formula}
            }
        )()`
    );
    
}



var AnalWidget = ({
    formula,
    adminSection,
    
}) => {
    
    var isCurrent = useMemo(() => {
        return adminSection.currentFormulaId === formula.id

    }, [adminSection.currentFormulaId, formula.id])

    var [widget, setWidget] = useState( defaultValue );

    useEffect(() => {
        if ( widget.calculated ) {
            setWidget( defaultValue );
        }

    }, [formula.formula])

    var calculate = ( formula, ) => {
        var dtypes = allowedEntryDataTypes()
        
        Function_.resolve(
            (
                new Promise((res, rej) => {

                    var options = adminSection.options

                    res( eval( fullFormula( formula ) ) )
                })
            ),

            ( result ) => {
                if (result instanceof Object) {
                    result = JSON.stringify( result, null, 2 )
                }
                else if (!( ( dtypes ).includes( result ) )) {
                    result = `${result}`;
                }

                setWidget(p => ({
                    ...p,
                    value: result,
                    calculated: true, 
                }))
                
            },
            ( error ) => {
                
                setWidget(p => ({
                    ...p,
                    value: error.message || error || "Unknown error",
                    calculated: true,
                    error: true, 
                }))
            }
        )

    }

    useEffect(() => {

        calculate(formula.formula)
        
    }, [widget.calculated])

    var notSaved = (
        adminSection.editor?.value !== formula?.formula &&
        adminSection.currentFormulaId === formula.id
    );

    
    return (
        <div
            className={(
                "AnalWidget"+
                (widget.error ? " error": '') +
                (isCurrent ? " current": '')+
                ( notSaved ? " notSaved": '')
            )}
            onClick={() => {
                adminSection.setValue("currentFormulaId", formula.id)
            }}
            title={widget.value}
        >
            <span
                className='key'
            >
                {formula.name}
            </span>
            
            <span
                className='value'
            >
                {widget.value}
            </span>
        </div>
    )
}

export default AnalWidget;
