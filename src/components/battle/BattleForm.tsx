import { character, monster } from "../../store";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

interface BattleFormProps {
    monsters: monster[];
    characters: character[];
    addActiveCharacter: any;
    addActiveMonster: any
    turnArray: any; //change from any
    setTurnArray: any;
}

const BattleForm: React.FC<BattleFormProps> = ({ monsters, characters, addActiveCharacter, addActiveMonster, turnArray, setTurnArray }) => {

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

    // assign each creature random, unique initiative (0-100), used to determine turn order
    const assignTurnOrder = () => {
        while (true) {
            const randomNum = Math.floor(Math.random() * 100);
            if (!turnArray.includes(randomNum)) {
                setTurnArray([...turnArray, randomNum]);
                return randomNum;
            }
        }
    }

    const selectCharacter = (values: any) => {

        const { characterSelect } = values;

        let selected = characters.find(c => c.name === characterSelect);

        selected = JSON.parse(JSON.stringify(selected));
        selected!.initiative = assignTurnOrder();

        dispatch(addActiveCharacter(selected))
        // setActiveCharacters(prevState => [...prevState, selected!])

        characterFormik.resetForm();
    }

    const selectMonster = (monster: string) => {
        let selected = monsters.find(m => m.name === monster);
        selected = JSON.parse(JSON.stringify(selected));
        selected!.initiative = assignTurnOrder();

        dispatch(addActiveMonster(selected))

        monsterFormik.resetForm();
    }

    const addInitiative = (selected: monster | character) => {
        selected = JSON.parse(JSON.stringify(selected));
        selected!.initiative = assignTurnOrder();
        return selected
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