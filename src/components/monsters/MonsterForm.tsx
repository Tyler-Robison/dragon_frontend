import React from "react";

interface MonsterCreationInputsProps {
    formik: any
}

const MonsterCreationInputs: React.FC<MonsterCreationInputsProps> = ({ formik }) => {

 
    return (
        <div>
            <h1>Monster Attributes</h1>

            <div>
                <label htmlFor="species">Species</label>
                <input
                    id="species"
                    name="species"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.species}
                    placeholder="Species"
                />
                {formik.touched.species && formik.errors.species && (
                    <div className="error-msg">{formik.errors.species}</div>
                )}
            </div>

            <div>
                <label htmlFor="hp">Hit Points</label>
                <input
                    id="hp"
                    name="hp"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hp}
                    placeholder="Hit Points"
                />
                {formik.touched.hp && formik.errors.hp && (
                    <div className="error-msg">{formik.errors.hp}</div>
                )}
            </div>

            <div>
                <label htmlFor="attack">Attack</label>
                <input
                    id="attack"
                    name="attack"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.attack}
                    placeholder="Attack"
                />
                {formik.touched.attack && formik.errors.attack && (
                    <div className="error-msg">{formik.errors.attack}</div>
                )}
            </div>

            <div>
                <label htmlFor="ac">Armor Class</label>
                <input
                    id="ac"
                    name="ac"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ac}
                    placeholder="Armor Class"
                />
                {formik.touched.ac && formik.errors.ac && (
                    <div className="error-msg">{formik.errors.ac}</div>
                )}
            </div>

            <div>
                <label htmlFor="level">Level</label>
                <input
                    id="level"
                    name="level"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.level}
                    placeholder="Level"
                />
                {formik.touched.level && formik.errors.level && (
                    <div className="error-msg">{formik.errors.level}</div>
                )}
            </div>

            <div>
                <label htmlFor="size">Size</label>
                <input
                    id="size"
                    name="size"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.size}
                    placeholder="Size"
                />
                {formik.touched.size && formik.errors.size && (
                    <div className="error-msg">{formik.errors.size}</div>
                )}
            </div>

        </div>
    )
}

export default MonsterCreationInputs;