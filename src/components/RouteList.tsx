import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home'
import CharacterCreationForm from "./CharacterForm";
import CharacterList from "./CharacterList";
import CharacterProfile from "./CharacterProfile";

/** RouteList Contains all routes used by Healthy-Eater app
 * 
 * routes wrapped in <RequireAuth> require user to be logged in
 * 
 * unrecognized routes re-direct to homepage*/
const RouteList: React.FC = () => {

    return (
        <Routes>

            {/* homepage */}
            <Route path="/home" element={<Home />} />

            {/* character creation */}
            <Route path="/character/new" element={<CharacterCreationForm />} />

            <Route path="/characters" element={<CharacterList />} />

            <Route path="/characters/:characterID" element={<CharacterProfile />} />

            {/* re-direct routes */}
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='*' element={<Navigate replace to="/home" />} />
        </Routes>
    )
}

export default RouteList;