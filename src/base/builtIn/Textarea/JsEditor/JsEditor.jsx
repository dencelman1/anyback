import React from 'react';

const JsEditor = ({
  onChange,
  ...props
}) => {
  
  const onChange_ = ( event ) => {
    onChange && onChange( event );

    
  };

  return (
    <textarea
      {...props}

      onChange={onChange_}

    />
  );
};

export default JsEditor;
