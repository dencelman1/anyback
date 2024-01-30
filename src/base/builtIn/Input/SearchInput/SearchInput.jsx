import React, { useRef, useState } from "react";
import './SearchInput.scss';

import Input from "../input";


var SearchInput = ( {
    ...props
} ) => {
    return (
        <input
            {...props}
        />
    );
}

export default SearchInput;
