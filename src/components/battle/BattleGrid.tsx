import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import {
    selectActiveMonsters, selectActiveCharacters,
    assignCharacterInitAndLoc, assignMonsterInitAndLoc, activeCharacter, activeMonster
} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



// for now, assign random grid positions based on initiative
// TODO: implement drag and drop via react-dnd
const BattleGrid: React.FC = () => {

    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)
    // 
    const [turnOrder, setTurnOrder] = useState<number[]>([])
    const [turn, setTurn] = useState<number>(0)
    const dispatch = useDispatch()

    console.log('turn', turn)
    console.log('order', turnOrder)

    const navigate = useNavigate();
    const nrows = 10;
    const ncols = 10;
    const [grid, setGrid] = useState<any>([])

    // Assign all active monsters/characters random + unique locations and initiative
    useEffect(() => {
        dispatch(assignCharacterInitAndLoc(activeCharacters))
        dispatch(assignMonsterInitAndLoc(activeMonsters))
    }, [])

    // console.log('outer turn', turn)
    const handleClick = (count: number) => {
        console.log('handle turn', turn)
        console.log('handle order', turnOrder)

        const len = activeCharacters.length + activeMonsters.length - 1

        // turn is ALWAYS DEFAULT VALUE here, this is why useEffect has to handle conditional logic
        // Can't get correct state for turn inside Cell component
        if (turn < len) {
            setTurn(prevTurn => prevTurn + 1)
        }

        else {
            setTurn(() => 0)
        }
    }

    // shouldn't need this for turns to work correctly
    useEffect(() => {
        if (turn > activeCharacters.length + activeMonsters.length - 1) {
            setTurn(() => 0)
        }
    }, [turn])


    // function closure issue?
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
                    creature = mergedArray.find(ele => ele.location === count);
                }

                row.push(<Cell
                    key={count}
                    count={count}
                    creature={creature}
                    handleClick={handleClick}
                    turnOrder={turnOrder}
                    turn={turn}
                />
                )
                count++;
            }
            initialGrid.push(<tr key={y}>{row}</tr>);
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

        setTurnOrder(() => turnArray.sort((a, b) => b - a));
    }, [activeCharacters, activeMonsters])

    useEffect(() => {
        if (turnOrder.length) generateGrid();
    }, [turnOrder])






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
                    const mergedArray = [...activeCharacters, ...activeMonsters]
                    const creature: activeCharacter | activeMonster | undefined = mergedArray.find(c => c.initiative === t);

                    return (idx === turn ?
                        <p className="Active" key={idx}>{idx + 1} {creature!.name}</p> :
                        <p key={idx}>{idx + 1} {creature!.name}</p>)

                })}
            </div>
        </div>
    )
}

export default BattleGrid;