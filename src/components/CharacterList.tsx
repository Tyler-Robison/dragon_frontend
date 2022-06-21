import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCharacters } from "../store";
import { removeCharacter } from "../store";
import { Link } from 'react-router-dom';

const CharacterList: React.FC = () => {
    const dispatch = useDispatch();
    const characters = useSelector(selectCharacters);

    const handleRemoveCharacter = (id: String) => {
        dispatch(removeCharacter(id));
    }

    return (
        <ol>
            {characters.map(char => <li>
                <Link to={`/characters/${char.id}`}><b>Profile</b></Link>
                <p>First Name: {char.first_name}</p>
                <button onClick={() => handleRemoveCharacter(char.id)}>X</button>
                <p>Last Name: {char.last_name}</p>
                <p>ID: {char.id}</p>
                <hr></hr>
            </li>)}
        </ol>
    )
}

export default CharacterList;