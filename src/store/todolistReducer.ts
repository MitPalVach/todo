import {FilterValuesType, TodolistType} from "../Components/App/App";
import {v1} from "uuid";


export interface RemoveTodolistsAT {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}

export interface AddTodolistAT {
    type: 'ADD-TODOLIST'
    title: string
}

export interface changeTodolistTitleAT {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistID: string
}

export interface changeTodolistFilterAT {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValuesType
    todolistID: string
}

export type ActionsType =
    RemoveTodolistsAT | AddTodolistAT |
    changeTodolistTitleAT | changeTodolistFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistID)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl =>
                tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return (todolists.map(tl =>
                tl.id === action.todolistID ? {...tl, filter: action.value} : tl))
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistsAT => {
    return {type: "REMOVE-TODOLIST", todolistID}
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {type: "ADD-TODOLIST", title}
}
export const ChangeTodolistTitleAC = (title: string, todolistID: string): changeTodolistTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title, todolistID}
}
export const ChangeTodolistFilterAC = (value: FilterValuesType, todolistID: string): changeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", value, todolistID}
}
