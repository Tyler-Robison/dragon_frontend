import React, { useState } from 'react';
import './App.css';
import TodoList from './todoList/TodoList';
import initTodos from './todoList/initTodos';
import NewTodo from './todoList/NewTodo';
import { Todo } from './todoList/todo.model'
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import RouteList from './components/RouteList';


const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(initTodos)

    const addTodo = (text: string) => {
        // setTodos([...todos, { id: Math.random(), text }])
        setTodos(latestTodos => [...latestTodos, { id: Math.random(), text }]) // ensures we are using latest version of todos state. 
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

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
