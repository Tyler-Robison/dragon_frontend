import React from "react"
import { displayAbilities } from '../../supportFunctions'

interface CharacterProps {
    name: string;
    hp: number;
    abilities: string[];
    creatureClass: string;
    level: number;
}

const Character: React.FC<CharacterProps> = ({ name, hp, abilities, creatureClass, level }) => {

    // console.log('class', creatureClass)
    return (
        <div className="creature-div">
            <p><b>{name}</b></p>
            <p><b>HP: </b>{hp}</p>
            <p><b>Level {level} {creatureClass}</b></p>
            {displayAbilities(abilities)}

      
        </div>
    )
}

export default Character