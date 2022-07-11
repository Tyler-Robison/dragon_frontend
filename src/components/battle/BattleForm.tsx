import { character, monster } from "../../store";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

interface BattleFormProps {
    monsters: monster[];
    characters: character[];
    addActiveCharacter: any;
    addActiveMonster: any
}

const BattleForm: React.FC<BattleFormProps> = ({ monsters, characters, addActiveCharacter, addActiveMonster }) => {

    const dispatch = useDispatch()

    const characterFormik = useFormik({
        initialValues: {
            characterSelect: 'Tyler Robison'
        },
        onSubmit: values => selectCharacter(values),
    })

    const monsterFormik = useFormik({
        initialValues: {
            monsterSelect: 'Adult Red Dragon'
        },
        onSubmit: values => selectMonster(values.monsterSelect),
    })

    const selectCharacter = (values: any) => {
        const { characterSelect } = values;
        const selected = characters.find(c => c.name === characterSelect);
        dispatch(addActiveCharacter(selected))
        characterFormik.resetForm();
    }

    const selectMonster = (monster: string) => {
        const selected = monsters.find(m => m.name === monster);
        dispatch(addActiveMonster(selected))
        monsterFormik.resetForm();
    }

    const characterValues = characters.map(c => <option key={c.id} value={c.name}>{c.name}</option>);
    const monsterValues = monsters.map(m => <option key={m.id} value={m.name}>{m.name}</option>);

    return (
        <div>

            <p>Select Characters</p>
            <form onSubmit={characterFormik.handleSubmit}>
                <label htmlFor="characterSelect">Character</label>
                <select
                    id="characterSelect"
                    name="characterSelect"
                    onChange={characterFormik.handleChange}
                    onBlur={characterFormik.handleBlur}
                >{characterValues}</select>

                <button type="submit">Add Character</button>
            </form>
            <p>Select Monsters</p>

            <form onSubmit={monsterFormik.handleSubmit}>
                <label htmlFor="monsterSelect">Monsters</label>
                <select
                    id="monsterSelect"
                    name="monsterSelect"
                    onChange={monsterFormik.handleChange}
                    onBlur={monsterFormik.handleBlur}
                >{monsterValues}</select>

                <button type="submit">Add Monster</button>
            </form>
        </div>
    )
}

export default BattleForm