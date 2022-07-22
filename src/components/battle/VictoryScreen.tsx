import { useParams, useNavigate } from 'react-router-dom';
import { selectActiveMonsters, selectActiveCharacters } from "../../store";
import { useSelector } from "react-redux";

interface VictoryScreenProps {
    // mergedArray: (activeCharacter | activeMonster)[];
}

const VictoryScreen: React.FC<VictoryScreenProps> = () => {
    const { whoWon } = useParams()
    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)

    const distributeExp = () => {
        const experience = activeMonsters.map(m => m.challengeRating * 50)
        const totalExp = experience.reduce((accum, nextmonster) => {
            accum += nextmonster
            return accum
        }, 0)
        return totalExp / activeCharacters.length;
    }

    return (
        <div>
            <h1>{whoWon === 'monsters' ? 'Monsters Won!' : 'Characters won!'}</h1>
            <h3>Congratulations, each character receives {distributeExp()} experience!</h3>
        </div>
    )
}

export default VictoryScreen