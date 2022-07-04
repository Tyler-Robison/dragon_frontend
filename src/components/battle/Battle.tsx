import React, { useState } from "react"
import { useSelector } from "react-redux";
import { selectCharacters, selectMonsters, selectItems, character, monster } from "../../store";
import BattleHalf from "./BattleHalf";
import BattleForm from "./BattleForm";
import Monster from '../../models/Monster'
import Character from '../../models/Character'
import '../../styles/battle.css'

const Battle: React.FC = () => {
    const characters = useSelector(selectCharacters);
    const monsters = useSelector(selectMonsters)
    const items = useSelector(selectItems)

    const [activeCharacters, setActiveCharacters] = useState<Character[]>([]);
    const [activeMonsters, setActiveMonsters] = useState<Monster[]>([]);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [turnArray, setTurnArray] = useState<number[]>([])

    const startBattle = () => {
        setIsStarted(() => true);
    }

    return (
        <div>
            <div className="Battle">
                <BattleHalf combatants={activeCharacters} />
                <BattleHalf combatants={activeMonsters} />

            </div>
            <button onClick={startBattle}>Start Battle</button>
            <BattleForm
                characters={characters}
                monsters={monsters}
                setActiveCharacters={setActiveCharacters}
                setActiveMonsters={setActiveMonsters}
                turnArray={turnArray}
                setTurnArray={setTurnArray}
            />
        </div>
    )
}

export default Battle;