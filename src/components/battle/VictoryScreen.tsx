import { useParams, useNavigate } from 'react-router-dom';
import { selectActiveMonsters, selectActiveCharacters } from "../../store";
import { useSelector } from "react-redux";

interface VictoryScreenProps {

}

const VictoryScreen: React.FC<VictoryScreenProps> = () => {
    const { whoWon } = useParams()
    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)

    // only distribute exp if chars win
    const distributeExp = () => {
        const experienceArray = activeMonsters.map(m => m.challengeRating * 50)
        const totalExp = experienceArray.reduce((accum, nextmonster) => accum + nextmonster, 0)
        return totalExp / activeCharacters.length;
    }

    return (
        <div>
            <h1>{whoWon === 'monsters' ? 'Monsters Won!' : 'Characters won!'}</h1>
            <h3>Congratulations, each character receives {distributeExp()} experience!</h3>
            <div>
            {activeCharacters.map(c => <div key={c.initiative}> 
                {c.name}
                {/* {c.} */}
            </div> )}
            </div>
        </div>
    )
}

export default VictoryScreen