import React, { Dispatch, SetStateAction } from 'react'

interface BattleChoicesProps {
    setChosenAction: Dispatch<SetStateAction<string | null>>
    chosenAction: string
}

type possibleChoices = 'move' | 'attack' | 'pass' | 'kill';

const BattleChoices: React.FC<BattleChoicesProps> = ({ setChosenAction, chosenAction }) => {

    const handleChange = (choice: possibleChoices) => {
        if (choice === 'move') setChosenAction('move')
        else if (choice === 'attack') setChosenAction('attack')
        else if (choice === 'kill') setChosenAction('kill')
        else if (choice === 'pass') setChosenAction('pass')
      
    }

    return <div>

        <RadioButton
            label="Move"
            value={chosenAction === 'move'}
            onChange={() => handleChange('move')}
        />
        <RadioButton
            label="Attack"
            value={chosenAction === 'attack'}
            onChange={() => handleChange('attack')}
        />
        <RadioButton
            label="Pass"
            value={chosenAction === 'pass'}
            onChange={() => handleChange('pass')}
        />
        <RadioButton
            label="Kill"
            value={chosenAction === 'kill'}
            onChange={() => handleChange('kill')}
        />

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