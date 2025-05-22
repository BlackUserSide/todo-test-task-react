import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {ITodo} from '../types/todo'
import {notyfConfigurate} from "../utils/notyf-configurate.ts";
import {generateUnicId} from "../utils/generateUnicId.ts";

interface TodoState {
    todos: ITodo[]
    filter:  'open' | 'completed' | null,
}

const initialState: TodoState = {
    todos: [],
    filter: null

}

const notyf = notyfConfigurate()

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodosFromLocal(state) {
            const local = localStorage.getItem('data_todos')
            if (local) {
                state.todos = JSON.parse(local)
            }
        },
        addTodo(state, action: PayloadAction<string>) {
            let id: number
            do {
                id = generateUnicId()
            } while (state.todos.find((t) => t.id === id))

            const todo: ITodo = {
                id,
                title: action.payload,
                status: 'open',
            }

            state.todos.unshift(todo)
            localStorage.setItem('data_todos', JSON.stringify(state.todos))
        },
        setFilter(state, action: PayloadAction<'open' | 'completed' | null>) {
            state.filter = action.payload
        },
        changeStatus(state, action: PayloadAction<{ id: number; status: 'open' | 'completed' }>) {
            const index = state.todos.findIndex((t) => t.id === action.payload.id)
            if (index === -1) {
                notyf.error('Todo not found')
                return
            }
            state.todos[index].status = action.payload.status
            localStorage.setItem('data_todos', JSON.stringify(state.todos))
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter((t) => t.id !== action.payload)
            localStorage.setItem('data_todos', JSON.stringify(state.todos))
        },
    },
})

export const { addTodo, setTodosFromLocal, changeStatus, deleteTodo, setFilter } = todoSlice.actions
export default todoSlice.reducer
