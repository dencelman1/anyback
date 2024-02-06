import { useCallback, useRef } from "react";
import './JsEditor.scss';


var JsEditor = ({
  className,
  onChange,
  onKeyDown,
  forwardRef,
  ...props
}) => {
  
  var ref = forwardRef || useRef(null);


  var onChange_ = useCallback(( event ) => {
    onChange && onChange( event );

    
  }, [ onChange ]);

  var onKeyDown_ = useCallback(( event ) => {
    onKeyDown && onKeyDown( event );

    if (event.key === "Escape") {
      event.target?.blur()
    }
    
  }, [ onKeyDown ]);

  return (
    <textarea
      {...props}
      className={(
        "JsEditor default-scroll-bar column row medium"+
        (className ? ` ${className}`: "")
      )}

      onChange={onChange_}
      onKeyDown={onKeyDown_}
      spellCheck={false}
      ref={ref}

    />
  );
};

export default JsEditor;
