import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { selectCharacters, selectMonsters, selectItems, character, monster, selectActiveMonsters, addActiveMonster, selectActiveCharacters, addActiveCharacter } from "../../store";
import BattleHalf from "./BattleHalf";
import BattleForm from "./BattleForm";
import '../../styles/battle.css'
import { useNavigate } from "react-router-dom";

const BattlePlanner: React.FC = () => {
    const characters = useSelector(selectCharacters);
    const monsters = useSelector(selectMonsters)
    const items = useSelector(selectItems)
    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)
    const navigate = useNavigate();


    // const [activeCharacters, setActiveCharacters] = useState<character[]>([]);
    // const [activeMonsters, setActiveMonsters] = useState<monster[]>([]);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    

    const startBattle = () => {
        navigate('/battle')
    }

    // console.log('active', activeMonsters)

    return (
        <div>
            <div className="Battle">
                <BattleHalf characters={activeCharacters} />
                <BattleHalf monsters={activeMonsters} />

            </div>
            <button onClick={startBattle}>Start Battle</button>
            <BattleForm
                characters={characters}
                monsters={monsters}
                addActiveCharacter={addActiveCharacter}
                addActiveMonster={addActiveMonster}
            />
        </div>
    )
}

export default BattlePlanner;