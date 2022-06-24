import React, { useState, useEffect } from 'react'

interface CheckboxProps {
    label: string
    isChecked: boolean
    checkedState: boolean[]
    setCheckedState: any
    idx: number
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, checkedState, setCheckedState, idx }) => {

    const [checked, setChecked] = useState<boolean>(isChecked);

    // idx is checkbox index #
    useEffect(() => {
        setCheckedState(() => checkedState.map((ele, i) => {
            if (i === idx) return (checked ? true : false);
            return ele
        }))
    }, [checked])


    const handleChange = () => {
        setChecked(() => !checked);
    };

    return (


        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
            {label}
        </label>
    );
};

export default Checkbox