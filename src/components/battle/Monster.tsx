import React from "react"
import { displayAbilities } from '../../supportFunctions'

interface MonsterProps {
    name: string;
    hp: number;
    abilities: string[];
    creatureClass: string;
    challenge: number;
  
}

const Monster: React.FC<MonsterProps> = ({ name, hp, abilities, creatureClass, challenge }) => {

    console.log('class', creatureClass)
    return (
        <div className="creature-div">
            <p><b>{name}</b></p>
            <p><b>HP: </b>{hp}</p>
            <p><b> CR {challenge}</b></p>
            {displayAbilities(abilities)}

      
        </div>
    )
}

export default Monster