import React from "react";
import { useSelector } from "react-redux";
import { selectCharacters, selectMonsters, selectItems } from "../store";
import CharCard from './characters/CharCard'
import MonCard from './monsters/MonCard'
import ItemCard from './items/ItemCard'

interface CIMListProps {
    itemType: string;
}

const CIMList: React.FC<CIMListProps> = ({ itemType }) => {
    const characters = useSelector(selectCharacters);
    const monsters = useSelector(selectMonsters)
    const items = useSelector(selectItems)

    if (itemType === 'monster' && !monsters) return <p>Loading...</p>
    if (itemType === 'char' && !characters) return <p>Loading...</p>
    if (itemType === 'item' && !items) return <p>Loading...</p>

    return (
        <div>
            {itemType === 'char' && characters.map(char => <CharCard key={char.id} char={char} />)}
            {itemType === 'monster' && monsters.map(mon => <MonCard key={mon.id} monster={mon} />)}
            {itemType === 'item' && items.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
    )
}

export default CIMList;