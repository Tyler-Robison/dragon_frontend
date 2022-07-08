import '../../styles/battle.css'
import redDragon from '../../images/red_dragon.jpg'
import golem from '../../images/golem.jpg'
import { character, monster } from '../../store';


interface CellProps {
    coord: any;
    handleClick: any;
    creature: null | monster | character;
}


const Cell: React.FC<CellProps> = ({ coord, handleClick, creature }) => {

    const redDragonImg = <img src={redDragon}></img>
    const golemImg = <img src={golem}></img>
    let creatureImg = null;

    if (creature !== null) {
        if (creature.name === 'Stone Golem') creatureImg = golemImg
        else if (creature.name === 'Adult Red Dragon') creatureImg = redDragonImg
    }

    return (
        <td className="Cell">{creatureImg || coord}</td>
    )
}

export default Cell;