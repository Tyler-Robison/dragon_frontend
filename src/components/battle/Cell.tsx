import '../../styles/battle.css'
import redDragon from '../../images/red_dragon.jpg'
import golem from '../../images/golem.jpg'
import fighter from '../../images/fighter.jpg'
import warlock from '../../images/warlock.jpg'
import rogue from '../../images/rogue.jpg'
import wizard from '../../images/wizard.jpg'
import cleric from '../../images/cleric.jpg'
import { character, monster } from '../../store';


interface CellProps {
    count: number;
    handleClick: any;
    creature: null | monster | character;
}


const Cell: React.FC<CellProps> = ({ count, handleClick, creature }) => {

    const redDragonImg = <img src={redDragon}></img>
    const golemImg = <img src={golem}></img>
    const fighterImg = <img src={fighter}></img>
    const warlockImg = <img src={warlock}></img>
    const rogueImg = <img src={rogue}></img>
    const wizardImg = <img src={wizard}></img>
    const clericImg = <img src={cleric}></img>

    let creatureImg = null;


    if (creature !== null) {

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

    return (creatureImg ? <td className="Cell"><div onClick={() => handleClick(count)}>{creatureImg}</div></td> : <td className="Cell">{count}</td>)

}

export default Cell;