import { useDispatch } from "react-redux";
import { removeCharacter } from "../store";
import { Link } from 'react-router-dom';


interface CharCardProps {
    char: any;
}

const CharCard: React.FC<CharCardProps> = ({ char }) => {

    const dispatch = useDispatch()

    const handleDelete = (id: String) => {
        dispatch(removeCharacter(id));
    }

    const displayAbilities = (abilities: string[]) => {
        return (!abilities.length ? 'None' : abilities.join(', '))
    }

    return (
        <div className="row">
            <div key={char.id} className='Recipe col-12'>
                <p><b>First Name:</b> {char.first_name}</p>
                <p><b>Last Name:</b> {char.last_name}</p>
                <p><b>Abilites:</b> {displayAbilities(char.abilities)}</p>
                <Link to={`/characters/edit}`}><b>Edit</b></Link>
                <button onClick={() => handleDelete(char.id)}>Delete</button>
                <hr></hr>
            </div>
        </div>
    )
}

export default CharCard;