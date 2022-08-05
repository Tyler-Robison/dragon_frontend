import { activeCharacter, adjustLevel, selectCharacters } from "../../store"
import '../../styles/victory.css'
import { useSelector, useDispatch } from "react-redux";
import arrow from '../../images/arrow.jpeg'
import { useNavigate } from 'react-router-dom'

interface ExpTableProps {
    activeCharacters: activeCharacter[];
    earnedExp: number;
}

const ExpTable: React.FC<ExpTableProps> = ({ activeCharacters, earnedExp }) => {

    const characters = useSelector(selectCharacters);
    const activeIds = activeCharacters.map(c => c.id)
    const displayCharacters = characters.filter(c => activeIds.includes(c.id))
    const navigate = useNavigate()

    return (
        <div className="exp-container">
            <div className="exp-div">
                <h3>Before</h3>
                {activeCharacters.map((c, idx, arr) => <div key={c.initiative}>
                    <p>{c.name}</p>
                    <p>Level: {c.level}</p>
                    <p>Exp: {c.exp}</p>
                    {idx !== arr.length - 1 ? <hr></hr> : <></>}
                </div>)}
            </div>
            <div>
                <img className="exp-arrow" src={arrow} alt='arrow differentiating between exp before/after combat'></img>
            </div>
            <div className="exp-div">
                <h3>After</h3>

                {displayCharacters.map((c, idx, arr) => {
                    const { level, exp } = adjustLevel(c)
                    return <div key={idx}>
                        <p>{c.name}</p>
                        <p>Level: {level}</p>
                        <p>Exp: {exp}</p>
                        <button onClick={() => navigate(`/level/${c.id}`)}>Level {c.name}</button>
                        {idx !== arr.length - 1 ? <hr></hr> : <></>}
                    </div>
                })}
            </div>



        </div>
    )
}

export default ExpTable