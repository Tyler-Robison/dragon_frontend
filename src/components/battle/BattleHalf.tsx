import React, { useState } from "react"
import { useSelector } from "react-redux";
import Creature from "../../models/Creature";
import { selectCharacters, selectMonsters, selectItems, character, monster } from "../../store";
import Monster from '../../models/Monster'
import Character from '../../models/Character'

interface BattleHalfProps {
    combatants: Character[] | Monster[];
}

const BattleHalf: React.FC<BattleHalfProps> = ({ combatants }) => {

    return (
        <div className="BattleHalf">
            {combatants.map(creature => {
                // creature doesn't show class methods and "this" is undefined
                // We do have access to methods, just can't see them. 
                console.log('creature', creature)
                console.log('this', this)
                return <div

                    onClick={creature.reportHP}
                    className="creature-div" key={creature.initiative}>
                    <p><b>{creature.name}</b></p>
                    <p><b>HP: </b>{creature.hp}</p>
                    {/* <ol>{creature.abilities.map(a => {
                        return <li>{a}</li>
                    })}</ol> */}

                    {creature.creatureClass && <p><b>Class: </b>{creature.creatureClass}</p>}
                </div>
            })}
        </div>

    )
}

export default BattleHalf;