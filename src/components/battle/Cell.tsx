import '../../styles/battle.css'

interface CellProps {
    coord: any;
}

const Cell: React.FC<CellProps> = ({ coord }) => {

    return (
        <td className="Cell">{coord}</td>
    )
}

export default Cell;