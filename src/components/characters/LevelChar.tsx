
import { useParams, useNavigate } from 'react-router-dom';
import { activeCharacter, adjustLevel, selectCharacters } from "../../store"
import '../../styles/victory.css'
import { useSelector, useDispatch } from "react-redux";

// arrive here 
const LevelChar: React.FC = () => {

    const { id } = useParams();
    const characters = useSelector(selectCharacters);
    const charBeingLeveled = characters.find(c => c.id === +id!);
    const navigate = useNavigate();

    return (
        <div>
            <h1>{charBeingLeveled!.name} has reached level {charBeingLeveled?.level}</h1>
            <button onClick={() => navigate('victory/characters')}>Back to Exp Sheet</button>


        </div>
    )
}

export default LevelChar