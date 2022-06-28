import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeMonster } from "../store";

interface MonCardProps {
    monster: any;
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
                <p>Con: {monster.con} ConMod: {monster.conMod}</p>
                <p>Str: {monster.con} StrMod: {monster.conMod}</p>
                <p>Dex: {monster.con} DexMod: {monster.conMod}</p>
                <p>Int: {monster.con} IntMod: {monster.conMod}</p>
                <p>Wis: {monster.con} WisMod: {monster.conMod}</p>
                <p>Cha: {monster.con} ChaMod: {monster.conMod}</p>

                <Link to={`/monsters/edit}`}><b>Edit</b></Link>
                <button onClick={() => handleDelete(monster.id)}>Delete</button>

                <hr></hr>
            </div>
        </div>
    )
}

export default MonCard;