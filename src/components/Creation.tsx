import React, { useState } from "react";
import CharacterCreationForm from "./characters/CharacterForm";
import MonsterCreationForm from "./monsters/MonsterForm";
import AbilityForm from "./AbilityForm";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const Creation = () => {

    const navigate = useNavigate();
    const [selected, setSelected] = useState('Monster')

    const formik = useFormik({
        initialValues: {
            typeSelect: ''
        },
        onSubmit: values => handleFormikSubmit(values.typeSelect)
    })

    const handleFormikSubmit = (type: string) => {
        // if (type === '') type = 'Monster'
        navigate(`/creation/${type}`)
    }

    // add item
    const types = ['Monster', 'Character'];

    const typeValues = types.map(type => {
        return <option key={type} value={type}>{type}</option>
    })

    const fake = () => {
        console.log('fake')
    }

    const handleChange = (e:any) => {
        // console.log("Fruit Selected!!");
        setSelected(e.target.value)
    }

    // value in form persists on reset independent of state
    return (
        <div>
            <h1>Select what you want to make</h1>

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="typeSelect">Select Type</label>
                <select
                    id="typeSelect"
                    name="typeSelect"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={selected}
                // className="mx-2"
                >{typeValues}</select>

                <button type="submit">Choose Type</button>
            </form>
        </div>
    )
}

export default Creation;