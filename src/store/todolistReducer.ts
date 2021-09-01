import {FilterValuesType, TodolistType} from "../Components/App/App";
import {v1} from "uuid";


export type RemoveTodolistsAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type changeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistId: string
}
export type changeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValuesType
    todolistId: string
}

export const todolistId_1 = v1()
export const todolistId_2 = v1()
const initialState: Array<TodolistType> = [
    // {id: todolistId_1, title: 'Список фильмов', filter: 'all'},
    // {id: todolistId_2, title: 'Покупки', filter: 'all'},
]
export type ActionsType =
    RemoveTodolistsAT | AddTodolistAT |
    changeTodolistTitleAT | changeTodolistFilterAT

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl =>
                tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return (state.map(tl =>
                tl.id === action.todolistId ? {...tl, filter: action.value} : tl))
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistsAT => {
    return {type: "REMOVE-TODOLIST", todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string): changeTodolistTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title, todolistId}
}
export const ChangeTodolistFilterAC = (value: FilterValuesType, todolistId: string): changeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", value, todolistId}
}
