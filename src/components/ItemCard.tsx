import { useDispatch } from "react-redux";
import { removeItem } from "../store";
import { Link } from 'react-router-dom';


interface ItemCardProps {
    item: any;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {

    const dispatch = useDispatch()

    const handleDelete = (id: string) => {
        dispatch(removeItem(id));
    }

    const displayAbilities = (abilities: string[]) => {
        return (!abilities.length ? 'None' : abilities.join(', '))
    }
    // { name: 'Long Sword', type: 'Weapon', attack: '1d8', value: '50', id: uuid() },
    return (
        <div className="row">
            <div key={item.id} className='Recipe col-12'>
                <p><b>Name:</b> {item.name}</p>
                <p><b>Type:</b> {item.type}</p>
                <p><b>{item.type === 'Weapon' ? 'Attack': 'Armor'}</b> {item.attack || item.armor}</p>
                <p><b>Value:</b> {item.value}</p>
            
                {/* <p><b>Abilites:</b> {displayAbilities(char.abilities)}</p> */}
                <Link to={`/items/edit}`}><b>Edit</b></Link>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <hr></hr>
            </div>
        </div>
    )
}

export default ItemCard;