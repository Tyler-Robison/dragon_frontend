import { character, monster } from "../../store";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import Monster from '../../models/Monster'
import Character from '../../models/Character'
import Creature from "../../models/Creature";

interface BattleFormProps {
    monsters: monster[];
    characters: character[];
    setActiveCharacters: Dispatch<SetStateAction<Character[]>>;
    setActiveMonsters: Dispatch<SetStateAction<Monster[]>>;
    turnArray: any; //change from any
    setTurnArray: any;
}

const BattleForm: React.FC<BattleFormProps> = ({ monsters, characters, setActiveCharacters, setActiveMonsters, turnArray, setTurnArray }) => {

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
            const randomNum = Math.floor(Math.random() * 100) + 1;
            if (!turnArray.includes(randomNum)) {
                setTurnArray([...turnArray, randomNum]);
                return randomNum;
            }
        }
    }
    // type creature = {
    //     id: number,
    //     hp: number,
    //     ac: number,
    //     str: number,
    //     strMod: number,
    //     dex: number,
    //     dexMod: number,
    //     con: number,
    //     conMod: number,
    //     int: number,
    //     intMod: number,
    //     wis: number,
    //     wisMod: number,
    //     cha: number,
    //     chaMod: number,
    //     creatureClass: string,
    //     name: string,
    //     initiative: number
    // }
    const selectCharacter = (values: any) => {

        const { characterSelect } = values;

        let selected = characters.find(c => c.name === characterSelect);
        const { level, race } = selected!

        selected = JSON.parse(JSON.stringify(selected));
        selected!.initiative = assignTurnOrder();

        // @ts-expect-error -> fix!!!!!!!
        const newCharacter = new Character(race, level, new Creature(selected!))
        newCharacter.reportHP();

        setActiveCharacters(prevState => [...prevState, newCharacter!])

        characterFormik.resetForm();
    }

    const selectMonster = (monster: string) => {
        let selected = monsters.find(m => m.name === monster);
        const { challengeRating } = selected!
        selected = JSON.parse(JSON.stringify(selected));
        selected!.initiative = assignTurnOrder();

        // @ts-expect-error -> fix!!!!!!!
        const newMonster = new Monster(challengeRating, new Creature(selected!))

        setActiveMonsters(prevState => [...prevState, newMonster!])

        monsterFormik.resetForm();
    }

    // const races: string[] = ['Human', 'Tiefling', 'Dwarf', 'Elf'];
    // const levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const characterValues = characters.map(c => <option key={c.id} value={c.name}>{c.name}</option>);
    // const raceValues = races.map(r => <option key={r} value={r}>{r}</option>);
    // const levelValues = levels.map(l => <option key={l} value={l}>{l}</option>)
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

                {/* <label htmlFor="raceSelect">Race</label>
                <select
                    id="raceSelect"
                    name="raceSelect"
                    onChange={characterFormik.handleChange}
                    onBlur={characterFormik.handleBlur}
                >{raceValues}</select>

                <label htmlFor="levelSelect">Level</label>
                <select
                    id="levelSelect"
                    name="levelSelect"
                    onChange={characterFormik.handleChange}
                    onBlur={characterFormik.handleBlur}
                >{levelValues}</select> */}

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