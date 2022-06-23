import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { character, addCharacter } from "../store";
import { characterAbilities, monsterAbilities } from "../abilities";
import useTimedMessage from "../customHooks/useTimedMessage"


interface AbilityFormProps {
    type: string;
    abilities: string[];
    setAbilities: (parameter: any) => any;
}

const AbilityForm: React.FC<AbilityFormProps> = ({ type, abilities, setAbilities }) => {

    const navigate = useNavigate();
    const genId = () => uuid();
    const dispatch = useDispatch()
    const [failureMsg, setFailureMsg] = useTimedMessage(1500)


    const formik = useFormik({
        initialValues: {
            abilities: ''
        },
        onSubmit: values => addAbility(values.abilities),
    })

    const addAbility = async (ability: any) => {

        if (ability === '' && type === 'Monster') ability = 'Multi Attack'
        if (ability === '' && type === 'Character') ability = 'Fireball'
        if (abilities.includes(ability)) {
            setFailureMsg(true);
            return;
        }

        setAbilities([...abilities, ability])
    }

    const characterAbilityValues = characterAbilities.map(ability => {
        return <option key={ability} value={ability}>{ability}</option>
    })

    const monsterAbilityValues = monsterAbilities.map(ability => {
        return <option key={ability} value={ability}>{ability}</option>
    })

    return (
        <div>
            {failureMsg && <p className="error-msg">Already added that ability</p>}
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="abilities">Select Ability</label>
                {type === 'Character' && <select
                    id="abilities"
                    name="abilities"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                // className="mx-2"
                >{characterAbilityValues}</select>}

                {type === 'Monster' && <select
                    id="abilities"
                    name="abilities"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                // className="mx-2"
                >{monsterAbilityValues}</select>}


                <button className="general-btn LoginForm-btn" data-testid="character-creation-btn" type="submit">Add Ability</button>

            </form>

        </div>
    )
}

export default AbilityForm;