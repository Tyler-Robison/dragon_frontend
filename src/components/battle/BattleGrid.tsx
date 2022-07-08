import React, { useState } from "react";
import Cell from "./Cell";

const BattleGrid: React.FC = () => {

    const nrows = 10;
    const ncols = 10;

    const initialGrid = [];
    for (let y = 0; y < nrows; y++) {
        const row = [];
        for (let x = 0; x < ncols; x++) {
            const coord = `${y}-${x}`;
            row.push(<Cell key={coord}
                coord={coord}
            //   isLit={board[y][x]}
            //   handleClick={() => handleClick(coord)}
            />
            )
        }
        initialGrid.push(<tr>{row}</tr>);
    }

    const [grid, setGrid] = useState(initialGrid)

    return (
        <div>

            <h1>Eliminate Monsters to Win!</h1>
            <table>
                <tbody>{grid}</tbody>
            </table>
        </div>
    )
}

export default BattleGrid;