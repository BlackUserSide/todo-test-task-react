import {useEffect, useState} from 'react'
import {PlusIcon} from './components/icons/PlusIcon'
import {Todo} from './components/Todo'
import {useAppDispatch} from "./hooks/useApiDispatch.ts";
import {addTodo, setFilter, setTodosFromLocal} from "./features/todoSlice.ts";
import {selectFilteredTodos} from "./features/todoSelectors.ts";
import {useAppSelector} from "./hooks/useAppSelector.ts";
import type {ITodo} from "./types/todo.ts";
import type {RootState} from "./app/store.ts";


export const App = () => {
    const filter = useAppSelector((state:RootState) => state.todo.filter)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [nameTodo, setNameTodo] = useState('')
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const filteredTodos = useAppSelector(selectFilteredTodos)
    const handleAdd = () => {
        if (!nameTodo.trim()) {
            setError('Name is required')
            return
        }
        if (nameTodo.length > 75) {
            setError('Max length is 75 symbols')
            return
        }
        dispatch(addTodo(nameTodo))
        setNameTodo('')
        setError('')
        setOpenPopUp(false)
    }
    useEffect(() => {
        dispatch(setTodosFromLocal())
    }, [dispatch])
    return (
        <div className="container-todo-content">
            <div className="control-wrapper">
                <div className="filters-container">
                    <button
                        className={`all-btn btn ${filter === null ? 'is-select' : ''}`}
                        onClick={() => dispatch(setFilter(null))}
                    >
                        All
                    </button>
                    <button
                        className={`open-todo-btn btn ${filter === 'open' ? 'is-select' : ''}`}
                        onClick={() => dispatch(setFilter('open'))}
                    >
                        Open
                    </button>
                    <button
                        className={`closed-todo-btn btn ${filter === 'completed' ? 'is-select' : ''}`}
                        onClick={() => dispatch(setFilter('completed'))}
                    >
                        Completed
                    </button>
                </div>
                <div className="control-btn-group">
                    <button className="add-btn btn" onClick={() => setOpenPopUp(!openPopUp)}>
                        <PlusIcon/>
                        <span>Add todo</span>
                    </button>
                </div>
            </div>

            <div className="container-items-todo">
                {filteredTodos.map((item: ITodo) => (
                    <Todo key={item.id} todo={item}/>
                ))}
            </div>

            {openPopUp && (
                <div className="pop-up-form">
                    <div className="bg-lock"></div>
                    <div className="pop-up-container-wrapper">
                        <div className="title-container">
                            <h3 className="h3">Add Todo</h3>
                        </div>
                        <div className="container-form-add">
                            <div className="input-container">
                                <label>Todo (Max length 75 symbols)</label>
                                <input
                                    name="nameTodo"
                                    value={nameTodo}
                                    onChange={(e) => setNameTodo(e.target.value)}
                                    placeholder="Example create something"
                                />
                                {error && (
                                    <div className="container-error-message">
                                        <span>{error}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button className="add-btn-form btn" onClick={handleAdd}>
                            <span>Add Todo</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
