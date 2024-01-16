import React from 'react';
import './Button.scss'

interface ButtonProps {
    name:string
}

export default function Button ({name}:ButtonProps) {

    
    return (
        <>
            <button className='btn'>{name}</button>
        </>
    );
}