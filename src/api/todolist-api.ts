import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "411482a7-ac02-48c2-a201-383524308513",
    }
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodoType[]>('todo-lists')
    },
    postTodolist(title: string) {
        return instance.post<ResponseTodoType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodoType>(`todo-lists/${todolistId}`)
    },
    putTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodoType>(`todo-lists/${todolistId}`, {title})
    },
    // TASKS
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`todo-lists/${todolistId}/tasks`)
    },
    postTask(todolistId: string, title: string) {
        return instance.post<ResponseTasksType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    putTask(todolistId: string, taskId: string, title: string) {
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseTodoType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ResponseTasksType = {
    error: string
    totalCount: number
    items: TaskType[]
}

type UpdateTaskType<T = {}> = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
    resultCode: number
    messages: string[]
    data: T
}