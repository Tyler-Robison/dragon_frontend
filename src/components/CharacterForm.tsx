import React from "react";

interface CharacterCreationInputsProps {
    formik: any
}

const CharacterCreationInputs: React.FC<CharacterCreationInputsProps> = ({ formik }) => {

    return (
        <div>
            <h1>Character Attributes</h1>

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

        </div>
    )
}

export default CharacterCreationInputs;