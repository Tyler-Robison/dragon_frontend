import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { MonsterAPI } from './APIs/monsterAPI';
import { getStarterDataThunk } from './store';
import NavBar from './components/NavBar';
import RouteList from './components/RouteList';
import { fillMonsters } from './store';


const App: React.FC = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const getMonsters = async () => {
            const starterMonsters = await MonsterAPI.findAll();
            dispatch(fillMonsters(starterMonsters));
        }

        getMonsters();
    }, [])



    return (
        <div className="App">
            {/* <NewTodo addTodo={addTodo} />
            <TodoList items={todos} deleteTodo={deleteTodo} /> */}
            <NavBar />
            <RouteList />
        </div>
    );
}

export default App;
