import React, { useState } from "react";
import CharacterCreationForm from "./CharacterForm";
import MonsterCreationForm from "./MonsterForm";
import AbilityForm from "./AbilityForm";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const Creation = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            typeSelect: ''
        },
        onSubmit: values => handleFormikSubmit(values.typeSelect)
    })

    const handleFormikSubmit = (type: string) => {

        console.log('type', type)
        if (type === '') type = 'Monster'
        navigate(`/creation/${type}`)
    }

    // add item
    const types = ['Monster', 'Character'];

    const typeValues = types.map(type => {
        return <option key={type} value={type}>{type}</option>
    })

    // value in form persists on reset independent of state
    return (
        <div>
            <h1>Select what you want to make</h1>

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="typeSelect">Select Type</label>
                <select
                    id="typeSelect"
                    name="typeSelect"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                // className="mx-2"
                >{typeValues}</select>

                <button type="submit">Choose Type</button>
            </form>
        </div>
    )
}

export default Creation;