import React, { useState } from "react"
import { useSelector } from "react-redux";
import Creature from "../../models/Creature";
import { selectCharacters, selectMonsters, selectItems, character, monster } from "../../store";
import Character from './Character'
import Monster from './Monster'


interface BattleHalfProps {
    characters?: character[];
    monsters?: monster[];
}


const BattleHalf: React.FC<BattleHalfProps> = ({ monsters, characters }) => {

    if (monsters) return (
        <div className="BattleHalf">
            {monsters.map(m => <Monster
                key={m.initiative}
                name={m.name}
                hp={m.hp}
                abilities={m.abilities}
                creatureClass={m.creatureClass}
                challenge={m.challengeRating}
            />
            )}
        </div>
    )
    else return (
        <div className="BattleHalf">
            {characters!.map(c => <Character
                key={c.initiative}
                name={c.name}
                hp={c.hp}
                abilities={c.abilities}
                creatureClass={c.creatureClass}
                level={c.level}
            />
            )}
        </div>
    )
}

export default BattleHalf;