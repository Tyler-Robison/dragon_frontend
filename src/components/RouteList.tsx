import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home'
import CIMList from "./CIMList";
import CharacterDetail from "./characters/CharacterDetail";
import Creation from "./Creation";
import CreationPartTwo from "./CreationPartTwo";
import BattlePlanner from "./battle/BattlePlanner";
import BattleForm from "./battle/BattleForm";
import BattleGrid from "./battle/BattleGrid";
import VictoryScreen from "./battle/VictoryScreen";
import LevelChar from "./characters/LevelChar";

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
            <Route path="/creation" element={<Creation />} />
            <Route path="/creation/:creationType" element={<CreationPartTwo />} />
            <Route path="/characters" element={<CIMList itemType="char" />} />
            <Route path="/monsters" element={<CIMList itemType="monster" />} />
            <Route path="/items" element={<CIMList itemType="item" />} />
            <Route path="/planner" element={<BattlePlanner />} />
            <Route path="/battle" element={<BattleGrid />} />
            <Route path="/victory/:whoWon" element={<VictoryScreen />} />



            <Route path="/characters/:characterID" element={<CharacterDetail />} />

            <Route path="/level/:id" element={<LevelChar />} />
            {/* re-direct routes */}
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='*' element={<Navigate replace to="/home" />} />
        </Routes>
    )
}

export default RouteList;