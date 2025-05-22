import type {ITodo} from '../types/todo'
import {useAppDispatch} from '../hooks/useApiDispatch'
import {changeStatus, deleteTodo} from '../features/todoSlice'
import {DoneIcon} from './icons/DoneIcon'
import {DeleteIcon} from './icons/DeleteIcon'

interface Props {
    todo: ITodo
}

export const Todo = ({ todo }: Props) => {
    const dispatch = useAppDispatch()

    const handleToggleStatus = () => {
        const newStatus = todo.status === 'open' ? 'completed' : 'open'
        dispatch(changeStatus({ id: todo.id, status: newStatus }))
    }
    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
    }

    return (
        <div className={`container-item-todo ${todo.status === 'open' ? 'open-task' : 'closed-task'}`}>
            <div className="checkbox-container" onClick={handleToggleStatus}>
                <div className="container-checkbox">
                    {todo.status === 'completed' && <DoneIcon />}
                </div>
            </div>
            <div className="name-wrapper">
                <p>{todo.title}</p>
            </div>
            <div className="delete-container" onClick={handleDelete}>
                <DeleteIcon />
            </div>
        </div>
    )
}
