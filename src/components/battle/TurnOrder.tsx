import {
    selectActiveMonsters, selectActiveCharacters,
    assignCharacterInitAndLoc, assignMonsterInitAndLoc, activeCharacter, activeMonster, moveCharacter, moveMonster, hitMonster, hitCharacter
} from "../../store";

interface TurnOrderProps {
    turnOrder: number[];
    mergedArray: (activeCharacter | activeMonster)[];
    turn: number
}

const TurnOrder: React.FC<TurnOrderProps> = ({ turnOrder, mergedArray, turn }) => {

    return (
        <>
            <p>Turn Order (active creature is red, dead creatures are crossed out)</p>
            <div className="turn-container">

                {turnOrder.map((t, idx) => {
                    const creature: activeCharacter | activeMonster | undefined = mergedArray.find(c => c.initiative === t);
                    const { name, isAlive, hp } = creature!;

                    return (idx === turn ?
                        <div className='turn-div Active' key={idx}><p>{name}</p> <p> <b>HP: {hp}</b> </p> </div> :
                        <div key={idx} className={`turn-div ${!isAlive && 'dead-text'}`} > <p>{name}</p> <p> <b>HP: {hp}</b> </p> </div>)
                })}
            </div>
        </>
    )
}

export default TurnOrder