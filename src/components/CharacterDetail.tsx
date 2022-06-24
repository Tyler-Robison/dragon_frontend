import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { selectCharacters } from "../store";
import EditCharacterForm from "./EditCharacterForm";

const CharacterDetail: React.FC = () => {
    const { characterID } = useParams()
    const dispatch = useDispatch();
    const characters = useSelector(selectCharacters);
    const [isEditFormShowing, setIsEditFormShowing] = useState<Boolean>(false);
    const navigate = useNavigate();

    const character = characters.find(char => char.id === characterID);

    const showEditForm = () => {
        setIsEditFormShowing(true);
    }

    const goBack = () => {
        navigate('/characters')
    }

    return (
        <div>
            <div>
                <button onClick={goBack}>Back</button>
                <p> <b>First Name:</b> {character!.first_name}</p>
                <p> <b>Last Name:</b> {character!.last_name}</p>
                <button onClick={showEditForm}>Edit Character</button>
            </div>
            {isEditFormShowing && <EditCharacterForm character={character!} setIsEditFormShowing={setIsEditFormShowing}/>}
        </div>
    )
}

export default CharacterDetail;