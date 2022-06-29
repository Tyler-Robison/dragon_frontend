import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeMonster, monster } from "../../store";
import { displayAbilities } from '../../supportFunctions'

interface MonCardProps {
    monster: monster;
}

const MonCard: React.FC<MonCardProps> = ({ monster }) => {
    const dispatch = useDispatch()

    const handleDelete = (id: number) => {
        dispatch(removeMonster(id));
    }

    return (
        <div className="row">
            <div key={monster.id} className='Recipe col-12'>
                <b><p>Species: {monster.name}</p></b>
                <p>Hit Points: {monster.hp}</p>
                <p>Armor Class: {monster.ac}</p>
                <p>Armor Type: {monster.acType}</p>
                <p>Challenge Rating: {monster.challengeRating}</p>
                <p>Exp: {monster.challengeXP}</p>
                <p>Con: {monster.con} Mod: {monster.conMod}</p>
                <p>Str: {monster.str} Mod: {monster.strMod}</p>
                <p>Dex: {monster.dex} Mod: {monster.dexMod}</p>
                <p>Int: {monster.int} Mod: {monster.intMod}</p>
                <p>Wis: {monster.wis} Mod: {monster.wisMod}</p>
                <p>Cha: {monster.cha} Mod: {monster.chaMod}</p>
                <p><b>Abilities:</b> {displayAbilities(monster.abilities)}</p>

                <Link to={`/monsters/edit}`}><b>Edit</b></Link>
                <button onClick={() => handleDelete(monster.id)}>Delete</button>

                <hr></hr>
            </div>
        </div>
    )
}

export default MonCard;