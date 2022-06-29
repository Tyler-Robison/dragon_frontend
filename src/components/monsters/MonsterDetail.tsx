import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store';
import { useParams, useNavigate } from 'react-router-dom';
import { selectMonsters } from "../../store";
import EditMonsterForm from "../characters/EditCharacterForm";

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
                <p> <b>First Name:</b> {monster!.name}</p>
                <p> <b>Last Name:</b> {monster!.hp}</p>
                <ol>
                    {monster?.abilities.map(ability => {
                        return <li>{ability}</li>
                    })}
                </ol>
                <button onClick={showEditForm}>Edit Character</button>
            </div>
            {/* {isEditFormShowing && <EditMonsterForm monster={monster!} setIsEditFormShowing={setIsEditFormShowing}/>} */}
        </div>
    )
}

export default MonsterDetail;