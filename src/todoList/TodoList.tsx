import React, { useState } from "react"
import './TodoList.css'


interface TodoListProps {
    items: { id: number, text: string }[];
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, deleteTodo }) => {



    return (
        <div>
            <ol>
                {items.map(item => <li>
                    <span>{item.text}</span>
                    {/* <button onClick={() => deleteTodo(item.id)}>X</button> */}
                    <button onClick={deleteTodo.bind(null, item.id)}>X</button> {/* bind returns function it is acting on with a new 'this' value, here we are ignoring 'this' */}
                </li>)}
            </ol>
        </div>
    )
}

export default TodoList