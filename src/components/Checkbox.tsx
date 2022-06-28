import React, { useState, useEffect, forwardRef } from 'react'

interface CheckboxProps {
    label: string
    checkedState: boolean[]
    setCheckedState: React.Dispatch<React.SetStateAction<boolean[]>>
    idx: number
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const { label, checkedState, setCheckedState, idx } = props


    console.log('inner ref', ref)


    const handleChange = () => {
        setCheckedState(() => checkedState.map((boolVal, i) => {
            return i === idx ? !boolVal : boolVal;
        }))
    };

    // const handleChange = () => {

    //     ref.current.checked = !ref.current.checked

    // };

    return (
        <label>
            <input
                ref={ref}
                type="checkbox"
                checked={checkedState[idx]}
                onChange={handleChange}
            />
            {label}
        </label>
    );
});

export default Checkbox