import { FormEventHandler, useState } from "react";
import { activeCharacter, activeMonster } from "../../store"
import React, { SyntheticEvent } from 'react'

interface BattleChoicesProps {
    activeCreatures: (activeCharacter | activeMonster)[]
    handleAction: any
}

type possibleChoices = 'move' | 'attack' | 'pass'

const BattleChoices: React.FC<BattleChoicesProps> = ({ activeCreatures, handleAction }) => {
    const [choice, setChoice] = useState<string | null>(null);




    const handleChange = (choice: string) => {
        if (choice === 'move') setChoice('move')
        else if (choice === 'attack') setChoice('attack')
        else if (choice === 'pass') setChoice('pass')
    }

    return <div>

        <form onSubmit={(e) => handleAction(e, choice)}>
            <RadioButton
                label="Move"
                value={choice === 'move'}
                onChange={() => handleChange('move')}
            />
            <RadioButton
                label="Attack"
                value={choice === 'attack'}
                onChange={() => handleChange('attack')}
            />
            <RadioButton
                label="Pass"
                value={choice === 'pass'}
                onChange={() => handleChange('pass')}
            />
            <button type="submit">Choose</button>
        </form>
    </div>
}

interface RadioButtonProps {
    label: any;
    value: any;
    onChange: any;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="radio" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default BattleChoices