import React from "react";
import { useSelector } from "react-redux";
import { selectCharacters, selectMonsters, selectItems } from "../store";
import CharCard from './CharCard'
import MonCard from './MonCard'
import ItemCard from './ItemCard'

interface CIMListProps {
    itemType: string;
}

// want char, item, monster cards
const CIMList: React.FC<CIMListProps> = ({ itemType }) => {
    const characters = useSelector(selectCharacters);
    const monsters = useSelector(selectMonsters)
    const items = useSelector(selectItems)

    console.log('monstrs', monsters)
    if (!monsters) return <p>Loading...</p>
    return (

        <div>
            {itemType === 'char' && characters.map(char => <CharCard key={char.id} char={char} />)}
            {itemType === 'monster' && monsters.map(mon => <MonCard key={mon.id} monster={mon} />)}
            {itemType === 'item' && items.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
    )
}

export default CIMList;