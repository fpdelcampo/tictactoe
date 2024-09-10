import React from 'react'

export default function Square({value, onClick}) {
    function display() {
        switch(value) {
            case 1:
                return 'X'
            case -1:
                return 'O'
            default:
                return ''
        }
    }

    return (
        <button className='w-20 h-20 bg-white border border-black rounded-lg text-xl font-bold flex items-center justify-center' onClick={onClick}>{display()}</button>
    )
}