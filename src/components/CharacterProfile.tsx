import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { selectCharacters } from "../store";
import EditCharacterForm from "./EditCharacterForm";

const CharacterProfile: React.FC = () => {
    const { characterID } = useParams()
    const dispatch = useDispatch();
    const characters = useSelector(selectCharacters);
    const [isEditFormShowing, setIsEditFormShowing] = useState<Boolean>(false);
    const [editId, setEditId] = useState<String | null>(null);

    const character = characters.find(char => char.id === characterID);

    const showEditForm = () => {
        setIsEditFormShowing(true);
    }

    return (
        <div>
            <div>
                <p>First Name: {character!.first_name}</p>
                <p>First Name: {character!.last_name}</p>
                <button onClick={showEditForm}>Edit Character</button>
            </div>
            {isEditFormShowing && <EditCharacterForm character={character!} />}
        </div>
    )
}

export default CharacterProfile;