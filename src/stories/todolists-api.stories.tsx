import React, {useState} from 'react'
import {todolistsApi} from "../api/todolist-api";



export default {
    title: 'API'
}

// TODOLISTS
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const getTodo = () => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <button onClick={getTodo}>show Todolists</button>
        </div>
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodo = () => {
        todolistsApi.postTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodo}>post Todolist</button>
        </div>
        {JSON.stringify(state)}
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodo = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodo}>del Todolist</button>
        </div>
        {JSON.stringify(state)}
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const changeTodolistTitle = () => {
        todolistsApi.putTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={changeTodolistTitle}>change Todolist Title</button>
        </div>
        {JSON.stringify(state)}
    </div>
}

// TASKS
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>show me Tasks in this Todolist</button>
        </div>
        {JSON.stringify(state)}
    </div>
}

export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('NEW TASK >>>')
    const postTask = () => {
        todolistsApi.postTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }
            }/>
            <button onClick={postTask}>add Task in This Todolist</button>
        </div>
        {JSON.stringify(state)}
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete Task</button>
        </div>
        {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('CHANGED TASK TITLE >>>')
    const changeTaskTitle = () => {
        todolistsApi.putTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={changeTaskTitle}>change Task Title</button>
        </div>
        {JSON.stringify(state)}</div>
}

