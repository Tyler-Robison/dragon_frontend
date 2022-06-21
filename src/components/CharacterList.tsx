import React from "react";
import { useSelector } from "react-redux";
import { selectCharacters } from "../store";

const CharacterList: React.FC = () => {

    const characters = useSelector(selectCharacters)

    return (
        <div>
            <ol>
                {characters.map(char => <li>
                    <p>First Name: {char.first_name}</p>
                    <p>Last Name: {char.last_name}</p>
                    <p>ID: {char.id}</p>
                </li>)}
            </ol>
        </div>
    )
}

export default CharacterList;