import React, { useState } from "react";
import CharacterCreationForm from "./CharacterForm";
import MonsterCreationForm from "./MonsterForm";
import AbilityForm from "./AbilityForm";
import { useFormik } from "formik";

const Creation = () => {

    const [creationType, setCreationType] = useState<string | null>(null)

    const formik = useFormik({
        initialValues: {
            typeSelect: ''
        },
        onSubmit: values => handleFormikSubmit(values.typeSelect)
    })

    const handleFormikSubmit = (type: string) => {
        if (type === '') type = 'Monster'
        setCreationType(type)
        console.log('type vals', type)
    }

    const reset = () => {
        setCreationType(null);
    }

    // add item
    const types = ['Monster', 'Character'];

    const typeValues = types.map(type => {
        return <option key={type} value={type}>{type}</option>
    })

    return (
        <div>
            {creationType === null && <h1>Select what you want to make</h1>}
            {creationType !== null && <h1>{creationType} Creator</h1>}

            {creationType === null &&
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
                </form>}

            {creationType !== null && <form>

                {creationType === 'Character' && <CharacterCreationForm />}
                {creationType === 'Monster' && <MonsterCreationForm />}
                {/* {creationType === 'Item' && <ItemCreationForm />} */}
                <AbilityForm type={creationType} />
                <button>Create {creationType}</button>
            </form>}

            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default Creation;