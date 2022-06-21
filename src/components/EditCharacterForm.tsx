import React from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import editCharacterValidation from '../formikValidation/editCharacter'
import { useDispatch } from "react-redux";
import { character, editCharacter } from "../store";

interface EditCharacterFormProps {
    character: character
}

const EditCharacterForm: React.FC<EditCharacterFormProps> = ({ character }) => {
    const validate = editCharacterValidation;
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            first_name: character.first_name,
            last_name: character.last_name,
        },
        validate,
        onSubmit: values => formikEditCharacter(values),
    })

    console.log('char', character)

    const formikEditCharacter = async (values: any) => {
        try {

            const editedCharacter: { first_name: string, last_name: string } = {
                first_name: values.first_name,
                last_name: values.last_name,
            };

            dispatch(editCharacter({ ...editedCharacter, id: character.id }))
            // navigate('/characters')
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

                <button className="general-btn LoginForm-btn" data-testid="character-creation-btn" type="submit">Edit Character</button>

            </form>

        </div>
    )
}

export default EditCharacterForm;