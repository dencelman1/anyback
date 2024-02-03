import { useCallback, useEffect, useMemo, useState } from 'react';
import './AnalWidget.scss';
import Function_ from '../../../../../../../base/utils/Function_';






var AnalWidget = ({
    name,
    formula,
    options,
}) => {
    var [widget, setWidget] = useState({
        value: "сalculation...",
        calculated: false,
        error: false,
    });

    var anyFuncRegex = useCallback(() => ( /function\s+(\w*)\s*\([^)]*\)\s*{/g ), []);

    var funcToStr = (func) => {
            // () => {}
            // function() {}
            // name() {}
            // 

    }

    var toString = ( object ) => {

        
        
        return object.load();


    }
    
    var fullFormula = ( formula ) => {
        if (typeof formula !== 'string')
            return ""

        if ( ( /(res|rej)\s*\(\s*[^)]*\s*\)/ ).test(formula) ) {
            return (
                `
                    new Promise((res, rej) => {
                        ${OptionsString()}
                        ${formula}

                    })
                `
            )
        }
        else if ( /return/.test(formula) ) {
            return (
                `(
                    () => {
                        ${OptionsString()}
                        ${formula}
                    }
                )()`
            );
        }

        return ( "" );
    }

    

    var calculate = () => {
        
        window.alert(  fullFormula( formula ) );
        return
        // TODO:
        Function_.resolve(
            eval( fullFormula( formula ) ),

            ( result ) => {
                setWidget(p => ({
                    ...p,
                    value: result,
                    calculated: true, 
                }))
                
            },
            ( error ) => {
                console.error( error );

                setWidget(p => ({
                    ...p,
                    value: "ERROR",
                    calculated: true,
                    error: true, 
                }))
            }
        )

    }

    useEffect(() => {


        calculate(formula)
        

    }, [widget.calculated])

    
    return (
        <div
            className="AnalWidget"
        >
            {name}: {widget.value}
        </div>
    )
}

export default AnalWidget;
