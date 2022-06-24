import React, { useState, useEffect } from 'react'

interface CheckboxProps {
    label: string
    isChecked: boolean
    checkedState: boolean[]
    setCheckedState: React.Dispatch<React.SetStateAction<boolean[]>>
    idx: number
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, checkedState, setCheckedState, idx }) => {

    const [checked, setChecked] = useState<boolean>(isChecked);

    // idx is checkbox index #
    useEffect(() => {
        setCheckedState(() => checkedState.map((boolVal, i) => {
            return i === idx ? checked : boolVal;
        }))
    }, [checked, setChecked])


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