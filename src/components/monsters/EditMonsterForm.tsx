import React, { useState, forwardRef } from "react";
import { useFormik } from "formik";
import editCharacterValidation from '../../formikValidation/editCharacter'
import { useAppDispatch, useAppSelector } from "../../store"; 
import { monster, editMonster } from "../../store";
import Checkbox from '../Checkbox'
import { characterAbilities } from "../../abilities";

interface EditMonsterFormProps {
    monster: monster
    setIsEditFormShowing: any
}

const EditMonsterForm: React.FC<EditMonsterFormProps> = ({ monster, setIsEditFormShowing }) => {
    const validate = editCharacterValidation;
    const dispatch = useAppDispatch()

    // forwarding refs allow me to access them in parent
    const ref = React.useRef<HTMLInputElement>(null);
    console.log('outer ref', ref)

    const boolArray = characterAbilities.map(ability => {
        return monster.abilities.includes(ability) ? true : false;
    })
    
    const [checkedState, setCheckedState] = useState<boolean[]>(boolArray)
    
    const formik = useFormik({
        initialValues: {
            first_name: monster.name,
            last_name: monster.hp
        },
        validate,
        onSubmit: values => formikEditCharacter(values),
    })

    // try/catch needed here? Shouldn't ever fail. 
    const formikEditCharacter = async (values: any) => {
    //     try {
    //         const newAbilities = characterAbilities.filter((ability, idx) => checkedState[idx])

    //         const editedMonster: { name: string, hp: string, abilities: string[] } = {
    //             name: values.name,
    //             hp: values.hp,
    //             abilities: newAbilities
    //         };

    //         dispatch(editMonster({ ...editedMonster, id: monster.id }))
    //         setIsEditFormShowing(false);
    //     } catch (err) {
    //         formik.resetForm();
    //         console.log('failed edit');
    //         // import timedMsg and display fail msg here
    //     }
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
                        // const isChecked = character.abilities.includes(ability) ? true : false;

                        return <Checkbox
                            key={ability}
                            label={ability}
                            checkedState={checkedState}
                            setCheckedState={setCheckedState}
                            idx={idx}
                            ref={ref}
                        />
                    })}

                  


                </div>

                <button className="general-btn LoginForm-btn" data-testid="character-creation-btn" type="submit">Edit Character</button>

            </form>

        </div>
    )
}

export default EditMonsterForm;