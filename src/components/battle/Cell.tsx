import '../../styles/battle.css'
import redDragon from '../../images/red_dragon.jpg'
import golem from '../../images/golem.jpg'
import fighter from '../../images/fighter.jpg'
import warlock from '../../images/warlock.jpg'
import rogue from '../../images/rogue.jpg'
import wizard from '../../images/wizard.jpg'
import cleric from '../../images/cleric.jpg'
import { activeCharacter, activeMonster } from '../../store';
import React, { useState, useEffect } from "react";


interface CellProps {
    count: number;
    handleClick: any;
    creature: null | activeCharacter | activeMonster | undefined;
    turn: number
    turnOrder: number[]
}


const Cell: React.FC<CellProps> = ({ count, handleClick, creature, turnOrder, turn }) => {

    const [active, setActive] = useState<boolean>(false)

    const redDragonImg = <img src={redDragon}></img>
    const golemImg = <img src={golem}></img>
    const fighterImg = <img src={fighter}></img>
    const warlockImg = <img src={warlock}></img>
    const rogueImg = <img src={rogue}></img>
    const wizardImg = <img src={wizard}></img>
    const clericImg = <img src={cleric}></img>

    let creatureImg = null;

    useEffect(() => {
        if (creature) {
            if (turnOrder[turn] === creature.initiative) {
                setActive(() => true);
            }
            else setActive(() => false);
        }
    }, [turn])


    if (creature !== null && creature !== undefined) {

        // monsters
        if (creature.name === 'Stone Golem') creatureImg = golemImg;
        else if (creature.name === 'Adult Red Dragon') creatureImg = redDragonImg;

        // characters
        else if (creature.creatureClass === 'Cleric') creatureImg = clericImg;
        else if (creature.creatureClass === 'Wizard') creatureImg = wizardImg;
        else if (creature.creatureClass === 'Rogue') creatureImg = rogueImg;
        else if (creature.creatureClass === 'Fighter') creatureImg = fighterImg;
        else if (creature.creatureClass === 'Warlock') creatureImg = warlockImg;
    }

    if (!creature) return <td className="Cell">{count}</td>

    else if (active) return <td className="Cell Bold"><div onClick={() => handleClick(count, creature)}>{creatureImg}</div></td>

    return <td className="Cell"><div>{creatureImg}</div></td>

}

export default Cell;