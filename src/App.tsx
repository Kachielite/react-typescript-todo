import React, {useState} from 'react';
import InputField from './components/InputField'
import './App.css';
import {Todo} from "./model";
import TodoList from "./components/Todo";
import {DragDropContext, DropResult} from "react-beautiful-dnd";

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("")
    const [todos, setTodos] = useState<Todo[]>([])
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

    const addTodoHandler = (e: React.FormEvent):void => {
        e.preventDefault()
        if (todo) {
            setTodos(prevState => [...prevState, {id: Date.now(), todo: todo, isDone: false}])
            setTodo("")
        }
    }

    const onDragEnd = (results: DropResult) => {
        const {source, destination} = results
        console.log(results)

        if(!destination) return;
        if(source.droppableId === destination.droppableId && source.index === destination.index) return;

        let add, active = todos, completed = completedTodos

        if(source.droppableId === "TodosList"){
            add = active[source.index]
            active.splice(source.index, 1)
        } else {
            add = completed[source.index]
            completed.splice(source.index, 1)
        }

        if(destination.droppableId === "TodosList"){
            active.splice(destination.index, 0, add)
        } else {
            completed.splice(destination.index, 0, add)
        }

        setCompletedTodos(completed)
        setTodos(active)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <h1 className="heading">Taskify</h1>
                <InputField todo={todo} setTodo={setTodo} addTodoHandler={addTodoHandler}/>
                <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
            </div>
        </DragDropContext>

    );
}

export default App;
