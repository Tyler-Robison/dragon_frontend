import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import {
    selectCharacters, selectMonsters, selectItems, character, monster, selectActiveMonsters,
    addActiveMonster, selectActiveCharacters, addActiveCharacter, moveCharacter, moveMonster,
    assignCharacterInitAndLoc, assignMonsterInitAndLoc
} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



// for now, assign random grid positions based on initiative
// TODO: implement drag and drop via react-dnd
const BattleGrid: React.FC = () => {

    // gets activeChars, the
    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)
    const [turnOrder, setTurnOrder] = useState<number[]>([])
    const [turn, setTurn] = useState<number>(0)
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const nrows = 10;
    const ncols = 10;
    const [grid, setGrid] = useState<any>([])

    // Assign all active monsters/characters random + unique locations and initiative
    useEffect(() => {
        dispatch(assignCharacterInitAndLoc(activeCharacters))
        dispatch(assignMonsterInitAndLoc(activeMonsters))
    }, [])

    console.log('outer turn', turn)
    const handleClick = (count: number) => {

        const len = activeCharacters.length + activeMonsters.length - 1

        // turn is ALWAYS 0 here, this is why useEffect has to handle conditional logic
        console.log('turn', turn)
        if (turn < len) {
            setTurn(prevTurn => prevTurn + 1)
        }

        else {
            setTurn(() => 0)
        }
    }

    useEffect(() => {
        if (turn > activeCharacters.length + activeMonsters.length - 1) {
            setTurn(() => 0)
        }
    }, [turn])


    const generateGrid = () => {
        const initialGrid = [];
        let count = 0;
        const locations = [];
        const mergedArray = [...activeCharacters, ...activeMonsters]

        for (let ele of mergedArray) {
            locations.push(ele.location)
        }

        for (let y = 0; y < nrows; y++) {
            const row = [];
            for (let x = 0; x < ncols; x++) {
                let creature = null;
                if (locations.includes(count)) {
                    creature = activeCharacters.find(ele => ele.location === count);
                    if (!creature) creature = activeMonsters.find(ele => ele.location === count);
                }
                row.push(<Cell key={count}
                    count={count}
                    creature={creature!}
                    handleClick={handleClick}
                />
                )
                count++;
            }
            initialGrid.push(<tr key={count}>{row}</tr>);
        }
        setGrid(initialGrid)
    }

    useEffect(() => {
        const mergedArray = [...activeCharacters, ...activeMonsters]
        const initialAccum: number[] = []

        const turnArray = mergedArray.reduce((accum, nextEle) => {
            accum.push(nextEle.initiative);
            return accum;
        }, initialAccum)

        setTurnOrder(() => turnArray.sort((a, b) => a - b))

        generateGrid();
    }, [activeCharacters, activeMonsters])






    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>

            <h1>Eliminate Monsters to Win!</h1>
            <button onClick={goBack}>Go Back</button>
            <table>
                <tbody>{grid}</tbody>
            </table>
            <div>
                <button onClick={() => handleClick(5)}>Test</button>
                <p>Turn Order</p>
                {turnOrder.map((t, idx) => {

                    let creature: character | monster | undefined = activeCharacters.find(c => c.initiative === t);
                    if (!creature) creature = activeMonsters.find(m => m.initiative === t);

                    return (idx === turn ?
                        <p className="current-turn" key={idx}>{idx + 1} {creature!.name}</p> :
                        <p key={idx}>{idx + 1} {creature!.name}</p>)

                })}
            </div>
        </div>
    )
}

export default BattleGrid;