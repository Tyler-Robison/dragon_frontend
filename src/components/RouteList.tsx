import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Home'


/** RouteList Contains all routes used by Healthy-Eater app
 * 
 * routes wrapped in <RequireAuth> require user to be logged in
 * 
 * unrecognized routes re-direct to homepage*/
const RouteList: React.FC = () => {

    return (
        <Routes>

            {/* homepage */}
            <Route path="/healthyeater" element={<Home />} />





            {/* re-direct routes */}
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='*' element={<Navigate replace to="/home" />} />
        </Routes>
    )
}

export default RouteList;