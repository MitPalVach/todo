import {TasksStateType} from "../Components/App/App";
import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistsAT, todolistID_1, todolistID_2} from "./todolistReducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

const initialState:TasksStateType = {
    [todolistID_1]: [
        {id: v1(), title: "Бойцовский клуб", isDone: true},
        {id: v1(), title: "Крестный отец", isDone: true},
        {id: v1(), title: "Исчезнувшая", isDone: false},
        {id: v1(), title: "Пианист", isDone: false},
        {id: v1(), title: "Адвокат дьявола", isDone: false},
    ],
    [todolistID_2]: [
        {id: v1(), title: "Молоко", isDone: false},
        {id: v1(), title: "Хлеб", isDone: true},
        {id: v1(), title: "Сыр", isDone: false},
        {id: v1(), title: "Творрог", isDone: true},
        {id: v1(), title: "Торт", isDone: false},
        {id: v1(), title: "Кофе", isDone: false},
    ],
}
type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistAT | RemoveTodolistsAT;

export const tasksReducer = (state:TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter
            (task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => {
                    return task.id === action.taskId ? {...task, title: action.title} : task;
                })
            }
        }
        case 'ADD-TODOLIST' : {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        default:
            return state
        // throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => ({
    type: 'ADD-TASK', todolistId, title
})
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => ({
    type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId
})
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}


