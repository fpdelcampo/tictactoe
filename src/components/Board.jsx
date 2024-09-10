import React from 'react';
import Square from './Square';

export default function Board({squares, onMove}) {
    return (
        <div className='grid grid-rows-3 grid-cols-3 mx-auto mb-40'>
            {squares.map((value, index) => 
                <Square key={index} value={value} onClick={() => onMove(index)}/>
            )}
        </div>
    )
}
