import React, { useState, useEffect, SyntheticEvent } from "react";
import Cell from "./Cell";
import {
    selectActiveMonsters, selectActiveCharacters,
    assignCharacterInitAndLoc, assignMonsterInitAndLoc, activeCharacter, activeMonster
} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BattleChoices from "./BattleChoices";



// for now, assign random grid positions based on initiative
// TODO: implement drag and drop via react-dnd
const BattleGrid: React.FC = () => {

    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)
    const mergedArray = [...activeCharacters, ...activeMonsters]
    const [turnOrder, setTurnOrder] = useState<number[]>([])
    const [turn, setTurn] = useState<number>(0)
    const dispatch = useDispatch()
    const [chosenAction, setChosenAction] = useState<string | null>(null)
    const [AP, setAP] = useState<number>(2); // action points determine how many actions you can take

    const navigate = useNavigate();
    const nrows = 10;
    const ncols = 10;


    // Assign all active monsters/characters random + unique locations and initiative
    useEffect(() => {
        dispatch(assignCharacterInitAndLoc(activeCharacters))
        dispatch(assignMonsterInitAndLoc(activeMonsters))
    }, [])

    const advanceTurn = () => {
        const length = mergedArray.length - 1;
        turn < length ? setTurn(prev => prev + 1) : setTurn(() => 0);
    }

    const handleClick = (count: number, creature: activeCharacter | activeMonster) => {

        console.log('crea', creature)


        // continue turn rotation
        advanceTurn()
    }

    const handleAction = (e: SyntheticEvent, action: string) => {

        e.preventDefault();
        if (action === 'move') {
            console.log('you chose move')
        }
        else if (action === 'attack') {
            console.log('you chose attack')
        }
        else if (action === 'pass') {
            console.log('you chose pass')
            advanceTurn();
        }
    }

    const generateGrid = () => {
        const initialGrid = [];
        let count = 0;
        const locations = [];

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
        return initialGrid
    }

    useEffect(() => {
        const initialAccum: number[] = []

        const turnArray = mergedArray.reduce((accum, nextEle) => {
            accum.push(nextEle.initiative);
            return accum;
        }, initialAccum)

        setTurnOrder(() => turnArray.sort((a, b) => b - a));
    }, [activeCharacters, activeMonsters])

    if (turnOrder.length === 0) return <p>Loading...</p>

    return (
        <div>
            <h1>Eliminate Monsters to Win!</h1>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <table>
                <tbody>{generateGrid()}</tbody>
            </table>
            <div>
                <p>Turn Order</p>
                {turnOrder.map((t, idx) => {
                    const creature: activeCharacter | activeMonster | undefined = mergedArray.find(c => c.initiative === t);

                    return (idx === turn ?
                        <p className="Active" key={idx}>{idx + 1} {creature!.name}</p> :
                        <p key={idx}>{idx + 1} {creature!.name}</p>)
                })}
            </div>
            <BattleChoices activeCreatures={mergedArray} setChosenAction={setChosenAction} handleAction={handleAction} />
        </div>
    )
}

export default BattleGrid;