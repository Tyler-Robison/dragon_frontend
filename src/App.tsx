import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './store';
import NavBar from './components/NavBar';
import RouteList from './components/RouteList';
import { fillMonsterThunk } from './store';


const App: React.FC = () => {

    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fillMonsterThunk())
    }, [])



    return (
        <div className="App">
            <NavBar />
            <RouteList />
        </div>
    );
}

export default App;
