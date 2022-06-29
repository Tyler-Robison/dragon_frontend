import React, {useState} from "react"
import { useSelector } from "react-redux";
import { selectCharacters, selectMonsters, selectItems, character, monster } from "../../store";


interface BattleHalfProps {
    combatants: character[] | monster[];
}

const BattleHalf: React.FC<BattleHalfProps> = ({ combatants }) => {

  

    return (
        <div className="BattleHalf">
            {combatants.map(creature => {
                return <div>
                    <p>{creature.name}</p>
                    <p>{creature.hp}</p>
                </div>
            })}
        </div>

    )
}

export default BattleHalf;