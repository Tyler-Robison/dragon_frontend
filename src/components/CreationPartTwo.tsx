import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CharacterCreationInputs from "./characters/CharacterForm";
import MonsterCreationInputs from "./monsters/MonsterForm";
import AbilityForm from "./AbilityForm";
import { useFormik } from "formik";
import characterValidate from "../formikValidation/characterCreation";
import monsterValidate from "../formikValidation/monsterCreations";
import { addCharacter, addMonster } from "../store";
import { useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';

const CreationPartTwo = () => {
    const navigate = useNavigate()
    const { creationType } = useParams()
    const [abilities, setAbilities] = useState<string[]>([])
    const dispatch = useDispatch()

    // let validate: (values: any) => CharacterErrors;
    let validate;
    let initialValues: any;

    if (creationType === 'Character') {
        validate = characterValidate;
        initialValues = {
            first_name: '',
            last_name: '',
        };
    }

    else if (creationType === 'Monster') {
        validate = monsterValidate;
        initialValues = {
            species: '',
            hp: '',
            attack: '',
            ac: '',
            level: '',
            size: '',
        };
    }

    const reset = () => {
        navigate('/creation')
    }


    const formik = useFormik({
        initialValues: initialValues!,
        validate,
        onSubmit: values => updateCreation(values),
    })

    const updateCreation = (values: any) => {
        const newCreation = { abilities, ...values, id: uuid() }

        if (creationType === 'Character') {
            dispatch(addCharacter(newCreation));
            navigate('/characters');
        }

        else if (creationType === 'Monster') {
            dispatch(addMonster(newCreation));
            navigate('/monsters');
        }

    }


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                {creationType === 'Character' && <CharacterCreationInputs formik={formik} />}
                {creationType === 'Monster' && <MonsterCreationInputs formik={formik} />}
                <button type="submit">Create {creationType}</button>
            </form>

            <AbilityForm type={creationType!} abilities={abilities} setAbilities={setAbilities} />

            <h3>Selected Abilities</h3>
            <ol>
                {abilities.map(ability => <li key={ability}>{ability}</li>)}
            </ol>


            <button onClick={reset}>Select Different Type</button>
        </div>
    )
}

export default CreationPartTwo;