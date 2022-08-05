import { useDispatch } from "react-redux";
import { removeCharacter } from "../../store";
import { Link } from 'react-router-dom';
import { displayAbilities } from "../../supportFunctions";

interface CharCardProps {
    char: any;
}

const CharCard: React.FC<CharCardProps> = ({ char }) => {

    const dispatch = useDispatch()

    const handleDelete = (id: string) => {
        dispatch(removeCharacter(+id));
    }

    return (
        <div className="row">
            <div key={char.id} className='Recipe col-12'>
                <p><b>Name:</b> {char.name}</p>
                <p><b>Race:</b> {char.race}</p>
                <p><b>Class:</b> {char.class}</p>
                <p><b>Level:</b> {char.level}</p>
                <p><b>Armor Class:</b> {char.ac}</p>
                <p>Con: {char.con} Mod: {char.conMod}</p>
                <p>Str: {char.str} Mod: {char.strMod}</p>
                <p>Dex: {char.dex} Mod: {char.dexMod}</p>
                <p>Int: {char.int} Mod: {char.intMod}</p>
                <p>Wis: {char.wis} Mod: {char.wisMod}</p>
                <p>Cha: {char.cha} Mod: {char.chaMod}</p>
                <p>Exp: {char.exp}</p>

                <p><b>Abilites:</b> {displayAbilities(char.abilities)}</p>
                <Link to={`/characters/${char.id}`}><b>Edit</b></Link>
                <button onClick={() => handleDelete(char.id)}>Delete</button>
                <hr></hr>
            </div>
        </div>
    )
}

export default CharCard;