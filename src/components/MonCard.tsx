import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeMonster } from "../store";

interface MonCardProps {
    monster: any;
}

const MonCard: React.FC<MonCardProps> = ({ monster }) => {
    const dispatch = useDispatch()

    const handleDelete = (id: string) => {
        dispatch(removeMonster(id));
    }

    return (
        <div className="row">
            <div key={monster.id} className='Recipe col-12'>
                <b><p>Species: {monster.species}</p></b>
                <p>Hit Points: {monster.hp}</p>
                <p>Attack: {monster.attack}</p>
                <p>Armor Class: {monster.ac}</p>
                <p>Level: {monster.level}</p>
                <p>Size: {monster.size}</p>
                <Link to={`/monsters/edit}`}><b>Edit</b></Link>
                <button onClick={() => handleDelete(monster.id)}>Delete</button>

                <hr></hr>
            </div>
        </div>
    )
}

export default MonCard;