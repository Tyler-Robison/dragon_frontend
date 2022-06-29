import React, { useState } from "react"
import { useSelector } from "react-redux";
import { selectCharacters, selectMonsters, selectItems, character, monster } from "../../store";
import BattleHalf from "./BattleHalf";
import BattleForm from "./BattleForm";
import '../../styles/battle.css'

const Battle: React.FC = () => {
    const characters = useSelector(selectCharacters);
    const monsters = useSelector(selectMonsters)
    const items = useSelector(selectItems)

    const [activeCharacters, setActiveCharacters] = useState<character[]>([]);
    const [activeMonsters, setActiveMonsters] = useState<monster[]>([]);

    return (
        <div>
            <div className="Battle">
                <BattleHalf combatants={activeCharacters} />
                <BattleHalf combatants={activeMonsters} />

            </div>
            <BattleForm characters={characters} monsters={monsters} setActiveCharacters={setActiveCharacters} setActiveMonsters={setActiveMonsters} />
        </div>
    )
}

export default Battle;