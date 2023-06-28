import React, {useEffect, useRef, useState} from "react";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Todo} from "../model";
import {Draggable} from "react-beautiful-dnd";

interface Props {
    index: number
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos}) => {
    const [editable, setIsEditable] = useState<boolean>(false)
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo)

    const inputRef = useRef<HTMLInputElement>(null)

    const isDoneHandler = (id: number): void => setTodos(todos.map(todo => todo.id === id ? {
        ...todo,
        isDone: !todo.isDone
    } : todo))
    const editHandler = (todo: Todo): void => {
        if (todo.isDone) {
            setIsEditable(false)
        }
        setIsEditable(true)
    }

    const deleteHandler = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const updateTodo = (e: React.FormEvent, id: number): void => {
        e.preventDefault()
        setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editedTodo} : todo))
        setIsEditable(false)
    }

    useEffect(() => inputRef.current?.focus(), [editable])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided,snapshot) => (
                    <form {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                          className={`todos__single ${snapshot.isDragging? "drag": ""}`} onSubmit={(e) => updateTodo(e, todo.id)}>
                        {editable ?
                            <input ref={inputRef} value={editedTodo} onChange={e => setEditedTodo(e.target.value)}
                                   className="todos__single--text"/> :
                            todo.isDone ? <s className="todos__single--text">{todo.todo}</s> :
                                <span className="todos__single--text">{todo.todo}</span>
                        }
                        <div>
                            <span className="icon" onClick={() => editHandler(todo)}><AiFillEdit/></span>
                            <span className="icon" onClick={() => deleteHandler(todo.id)}><AiFillDelete/></span>
                            <span className="icon" onClick={() => isDoneHandler(todo.id)}><MdDone/></span>
                        </div>
                    </form>
                )
            }
        </Draggable>

    )
}

export default SingleTodo;