import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import characterValidate from "../formikValidation/characterCreation";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { character, addCharacter } from "../store";


const CharacterCreationForm: React.FC = () => {
    const validate = characterValidate;
    const navigate = useNavigate();
    const genId = () => uuid();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: ''
        },
        validate,
        onSubmit: values => createCharacter(values),
    })

    const createCharacter = async (values: any) => {
        try {
            console.log('vals', values)
            const newCharacter: character = {
                first_name: values.first_name,
                last_name: values.last_name,
                id: genId()
            };

            dispatch(addCharacter(newCharacter))
            navigate('/characters')
        } catch (err) {
            formik.resetForm();
            console.log('failed creation');
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

                <button className="general-btn LoginForm-btn" data-testid="character-creation-btn" type="submit">Create Character</button>

            </form>

        </div>
    )
}

export default CharacterCreationForm;