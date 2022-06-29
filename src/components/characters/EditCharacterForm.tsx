import React, { useState, forwardRef } from "react";
import { useFormik } from "formik";
import editCharacterValidation from '../../formikValidation/editCharacter'
import { useDispatch } from "react-redux";
import { character, editCharacter } from "../../store";
import Checkbox from '../Checkbox'
import { characterAbilities } from "../../abilities";

interface EditCharacterFormProps {
    character: character
    setIsEditFormShowing: any
}

const EditCharacterForm: React.FC<EditCharacterFormProps> = ({ character, setIsEditFormShowing }) => {
    // const validate = editCharacterValidation;
    // const dispatch = useDispatch()

    // // forwarding refs allow me to access them in parent
    // const ref = React.useRef<HTMLInputElement>(null);
    // console.log('outer ref', ref)

    // const boolArray = characterAbilities.map(ability => {
    //     return character.abilities.includes(ability) ? true : false;
    // })
    
    // const [checkedState, setCheckedState] = useState<boolean[]>(boolArray)
    
    // const formik = useFormik({
    //     initialValues: {
    //         name: character.name,
    //     },
    //     validate,
    //     onSubmit: values => formikEditCharacter(values),
    // })

    // // try/catch needed here? Shouldn't ever fail. 
    // const formikEditCharacter = async (values: any) => {
    //     try {
    //         const newAbilities = characterAbilities.filter((ability, idx) => checkedState[idx])

    //         const editedCharacter: { name: string, abilities: string[] } = {
    //             name: values.name,
    //             abilities: newAbilities
    //         };

    //         dispatch(editCharacter({ ...editedCharacter, id: character.id }))
    //         setIsEditFormShowing(false);
    //     } catch (err) {
    //         formik.resetForm();
    //         console.log('failed edit');
    //         // import timedMsg and display fail msg here
    //     }
    // }

    // const myCheckBox = forwardRef((props, ref)) => {(
    //     return <input 
    //     ref={ref}
    //     />
    // )}

    return (
        <div>
            {/* <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        placeholder="First Name"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="error-msg">{formik.errors.name}</div>
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

            </form> */}

        </div>
    )
}

export default EditCharacterForm;