import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../store';
import { useParams, useNavigate } from 'react-router-dom';
import { selectMonsters } from "../store";
import EditCharacterForm from "./EditCharacterForm";

const MonsterDetail: React.FC = () => {
    const { characterID } = useParams()
    const dispatch = useAppDispatch();
    const monsters = useAppSelector(selectMonsters);
    const [isEditFormShowing, setIsEditFormShowing] = useState<Boolean>(false);
    const navigate = useNavigate();

    if (!characterID) {} // navigate?
    const monster = monsters.find(mon => mon.id === +!characterID);

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
                <p> <b>First Name:</b> {monster!.first_name}</p>
                <p> <b>Last Name:</b> {monster!.last_name}</p>
                <button onClick={showEditForm}>Edit Character</button>
            </div>
            {isEditFormShowing && <EditCharacterForm monster={monster!} setIsEditFormShowing={setIsEditFormShowing}/>}
        </div>
    )
}

export default MonsterDetail;