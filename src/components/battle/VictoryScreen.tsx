import { useParams, useNavigate } from 'react-router-dom';
import { selectActiveMonsters, selectActiveCharacters, addExp } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import ExpTable from './ExpTable'

interface VictoryScreenProps {

}

const VictoryScreen: React.FC<VictoryScreenProps> = () => {
    const { whoWon } = useParams();
    const activeMonsters = useSelector(selectActiveMonsters);
    const activeCharacters = useSelector(selectActiveCharacters);
    const dispatch = useDispatch();


    const distributeExp = () => {
        const experienceArray = activeMonsters.map(m => m.challengeRating * 50)
        const totalExp = experienceArray.reduce((accum, nextmonster) => accum + nextmonster, 0)
        return totalExp / activeCharacters.length;
    }

    // only distribute exp if chars win
    const earnedExp = whoWon === 'characters' ? distributeExp() : 0;

    dispatch(addExp({ characters: activeCharacters, exp: earnedExp }));
   

    return (
        <div>
            <h1>{whoWon === 'monsters' ? 'Monsters Won!' : 'Characters won!'}</h1>
            <h3>Congratulations, each character receives {earnedExp} experience!</h3>
            <ExpTable earnedExp={earnedExp} activeCharacters={activeCharacters} />
        </div>
    )
}

export default VictoryScreen