import React from "react";
import {Todo} from "../model";
import SingleTodo from "./SingleTodo";
import {Droppable} from "react-beautiful-dnd";

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {

    console.log(todos)
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className="todos__heading">Active Task</h1>
                            {todos.map((todo, index) => <SingleTodo index={index} key={todo.id} todos={todos}
                                                                    todo={todo}
                                                                    setTodos={setTodos}/>)}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {
                    (provided, snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}  ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className="todos__heading">Completed Task</h1>
                            {completedTodos.map((todo, index) => <SingleTodo index={index} key={todo.id}
                                                                             todos={completedTodos} todo={todo}
                                                                             setTodos={setCompletedTodos}/>)}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>

    )
}

export default TodoList;