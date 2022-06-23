import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CharacterCreationInputs from "./CharacterForm";
import MonsterCreationInputs from "./MonsterForm";
import AbilityForm from "./AbilityForm";
import { useFormik } from "formik";
import characterValidate from "../formikValidation/characterCreation";
import monsterValidate from "../formikValidation/monsterCreations";

const CreationPartTwo = () => {
    const navigate = useNavigate()
    const { creationType } = useParams()
    const [abilities, setAbilities] = useState<string[]>([])

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
        const newCreation = { abilities, ...values }
        console.log('creation', newCreation)
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