import React, { useState } from "react";
import { useFormik } from "formik";
import editCharacterValidation from '../formikValidation/editCharacter'
import { useDispatch } from "react-redux";
import { character, editCharacter } from "../store";
import Checkbox from './Checkbox'
import { characterAbilities } from "../abilities";

interface EditCharacterFormProps {
    character: character
    setIsEditFormShowing: any
}

const EditCharacterForm: React.FC<EditCharacterFormProps> = ({ character, setIsEditFormShowing }) => {
    const validate = editCharacterValidation;
    const dispatch = useDispatch()
    const [checkedState, setCheckedState] = useState(
        new Array(characterAbilities.length).fill(false)
    )

    const formik = useFormik({
        initialValues: {
            first_name: character.first_name,
            last_name: character.last_name
        },
        validate,
        onSubmit: values => formikEditCharacter(values),
    })

    // try/catch needed here? Shouldn't ever fail. 
    const formikEditCharacter = async (values: any) => {
        try {
            const newAbilities = characterAbilities.filter((ability, idx) => checkedState[idx])

            const editedCharacter: { first_name: string, last_name: string, abilities: string[] } = {
                first_name: values.first_name,
                last_name: values.last_name,
                abilities: newAbilities
            };

            dispatch(editCharacter({ ...editedCharacter, id: character.id }))
            setIsEditFormShowing(false);
        } catch (err) {
            formik.resetForm();
            console.log('failed edit');
            // import timedMsg and display fail msg here
        }
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                        placeholder="First Name"
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                        <div className="error-msg">{formik.errors.first_name}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                        placeholder="Last Name"
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                        <div className="error-msg">{formik.errors.last_name}</div>
                    )}
                </div>

                <div>
                    {characterAbilities.map((ability, idx) => {
                        const isChecked = (character.abilities.includes(ability) ? true : false);

                        return <Checkbox
                            key={ability}
                            label={ability}
                            isChecked={isChecked}
                            checkedState={checkedState}
                            setCheckedState={setCheckedState}
                            idx={idx}
                        />
                    })}


                </div>

                <button className="general-btn LoginForm-btn" data-testid="character-creation-btn" type="submit">Edit Character</button>

            </form>

        </div>
    )
}

export default EditCharacterForm;