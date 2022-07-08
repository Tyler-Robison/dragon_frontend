import React, { useState } from "react";
import Cell from "./Cell";
import { selectCharacters, selectMonsters, selectItems, character, monster, selectActiveMonsters, addActiveMonster, selectActiveCharacters, addActiveCharacter } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



// for now, assign random grid positions based on initiative
// TODO: implement drag and drop via react-dnd
const BattleGrid: React.FC = () => {

    const activeMonsters = useSelector(selectActiveMonsters)
    const activeCharacters = useSelector(selectActiveCharacters)
    // const allActive: any[] = activeMonsters.concat(activeCharacters)
    const navigate = useNavigate();
    const nrows = 10;
    const ncols = 10;
    const initiatives = [];

    for (let m of activeMonsters) {
        initiatives.push(m.initiative)
    }
    for (let c of activeCharacters) {
        initiatives.push(c.initiative)
    }

    const handleClick = (coord: string) => {

    }

    const goBack = () => {
        navigate(-1);
    }

    const initialGrid = [];
    let count = 0;

    for (let y = 0; y < nrows; y++) {
        const row = [];
        for (let x = 0; x < ncols; x++) {
            const coord = `${y}-${x}`;
            let creature = null;
            if (initiatives.includes(count)) {
                creature = activeCharacters.find(ele => ele.initiative === count);
                if (!creature) creature = activeMonsters.find(ele => ele.initiative === count);
            }
            row.push(<Cell key={coord}
                coord={coord}
                handleClick={() => handleClick(coord)}
                creature={creature!}
            />
            )
            count++;
        }
        initialGrid.push(<tr>{row}</tr>);

    }

    const [grid, setGrid] = useState(initialGrid)



    return (
        <div>

            <h1>Eliminate Monsters to Win!</h1>
            <button onClick={goBack}>Go Back</button>
            <table>
                <tbody>{grid}</tbody>
            </table>
        </div>
    )
}

export default BattleGrid;