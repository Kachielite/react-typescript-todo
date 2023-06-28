import React, {useRef} from 'react';
import './styles.css'

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    addTodoHandler: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({todo, setTodo, addTodoHandler}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <form className='input' onSubmit={e => {
            addTodoHandler(e)
            inputRef.current?.blur()
        }}>
            <input ref={inputRef} type="input" value={todo} onChange={e => setTodo(e.target.value)} placeholder="Enter a task"
                   className='input__box'/>
            <button type='submit' className='input_submit'>Go</button>
        </form>
    )
}

export default InputField