import { character, monster } from "../../store";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";

interface BattleFormProps {
    monsters: monster[];
    characters: character[];
    setActiveCharacters: Dispatch<SetStateAction<character[]>>;
    setActiveMonsters: Dispatch<SetStateAction<monster[]>>;
}

const BattleForm: React.FC<BattleFormProps> = ({ monsters, characters, setActiveCharacters, setActiveMonsters }) => {

    const formik = useFormik({
        initialValues: {},
        onSubmit: values => selectCreature(values),
    })

    const selectCreature = (values: any) => {
        if (values.characterSelect) {
            const selected = characters.find(c => c.name === values.characterSelect);

            // @ts-ignore
            setActiveCharacters(prevState => [...prevState, selected])
        }
        else {
            const selected = monsters.find(m => m.name === values.monsterSelect);
            // @ts-ignore
            setActiveMonsters(prevState => [...prevState, selected])
        }

        formik.resetForm();

    }

    const characterValues = characters.map(c => <option key={c.id} value={c.name}>{c.name}</option>);
    const monsterValues = monsters.map(m => <option key={m.id} value={m.name}>{m.name}</option>);

    return (
        <div>

            <p>Select Characters</p>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="characterSelect">Characters</label>
                <select
                    id="characterSelect"
                    name="characterSelect"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >{characterValues}</select>

                <button type="submit">Add Character</button>
            </form>
            <p>Select Monsters</p>

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="monsterSelect">Monsters</label>
                <select
                    id="monsterSelect"
                    name="monsterSelect"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >{monsterValues}</select>

                <button type="submit">Add Monster</button>
            </form>
        </div>
    )
}

export default BattleForm