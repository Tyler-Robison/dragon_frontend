import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './store';
import NavBar from './components/NavBar';
import RouteList from './components/RouteList';
import { fillMonsterThunk, fillCharacterThunk } from './store';


const App: React.FC = () => {

    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fillMonsterThunk())
        dispatch(fillCharacterThunk())
    }, [])



    return (
        <div className="App">
            <NavBar />
            <RouteList />
        </div>
    );
}

export default App;
