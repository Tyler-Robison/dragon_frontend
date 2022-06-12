import React, { useRef } from "react";
import './NewTodo.css'

// could be type instead of interface
interface addTodoFunc {
    addTodo: (todoText: string) => void;
}

const NewTodo: React.FC<addTodoFunc> = ({ addTodo }) => {

    // default val is null b/c it will be null until initial render, at which point input will exist
    // useRef is a generic function, need to know what data will be stored inside ref, which is the HTMLInputElement
    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        // ! tells TS that there will be a value for textInputRef, won't be null
        // .value b/c its an input ele
        const enteredText = textInputRef.current!.value
        addTodo(enteredText)
    }

    return (
        <form onSubmit={todoSubmitHandler}>
           
            <div className="form-control">
                <label htmlFor="todo-text">Todo Text</label>
                <input type='text id' id='todo-text' ref={textInputRef} />
                <button type="submit">Add Todo</button>
            </div>
        </form>
    )
}

export default NewTodo;