import { useState, useEffect } from 'react';

var useDebounce = (
  callback,
  delay,
) => {
  delay ||= 1000;
  
  var setTimeoutId = useState(null)[1];

  var runCallback = () => {

    setTimeoutId(prev => {
      clearTimeout(prev)

      return (
        setTimeout(callback, delay)
      )
    })

  }

  return runCallback;
}

export default useDebounce;
