import { selectCharacters, selectMonsters, selectItems, character, monster, selectActiveMonsters, addActiveMonster, selectActiveCharacters, addActiveCharacter } from "../../store";
import { useSelector } from "react-redux";

const Battle: React.FC = () => {
    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)

    return (
        <div>

        </div>
    )
}

export default Battle;