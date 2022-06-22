import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { character, addCharacter } from "../store";
import { characterAbilities, monsterAbilities } from "../abilities";


interface AbilityFormProps {
    type: string;
}

const AbilityForm: React.FC<AbilityFormProps> = ({ type }) => {

    const navigate = useNavigate();
    const genId = () => uuid();
    const dispatch = useDispatch()
    const [abilities, setAbilities] = useState<string[]>([])

    const formik = useFormik({
        initialValues: {
            abilities: ''
        },
        onSubmit: values => addAbility(values),
    })

    const addAbility = async (ability: any) => {
        try {
            console.log('vals', ability)
            setAbilities([...abilities, ability])
            console.log(abilities)
     
        } catch (err) {
            formik.resetForm();
            console.log('failed creation');
            // import timedMsg and display fail msg here
        }
    }

    const characterAbilityValues = characterAbilities.map(ability => {
        return <option key={genId()} value={ability}>{ability}</option>
    })

    const monsterAbilityValues = monsterAbilities.map(ability => {
        return <option key={genId()} value={ability}>{ability}</option>
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>


                <label htmlFor="abilities">Select Ability</label>
                {type === 'Character' && <select
                    id="abilities"
                    name="abilities"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                // className="mx-2"
                >{characterAbilityValues}</select>}

                {type === 'Monster' && <select
                    id="abilities"
                    name="abilities"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                // className="mx-2"
                >{monsterAbilityValues}</select>}


                <button className="general-btn LoginForm-btn" data-testid="character-creation-btn" type="submit">Add Ability</button>

            </form>

        </div>
    )
}

export default AbilityForm;