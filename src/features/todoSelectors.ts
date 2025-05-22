import type {ITodo} from "../types/todo.ts";
import type {RootState} from "../app/store.ts";

export const selectTodos = (state: RootState) => state.todo.todos
export const selectFilter = (state: RootState) => state.todo.filter

export const selectFilteredTodos = (state: RootState) => {

    const filter = selectFilter(state)
    const todos = selectTodos(state)
    if (!filter) return todos
    return todos.filter((t: ITodo) => t.status === filter)
}