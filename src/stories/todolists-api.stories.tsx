import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

// GET
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

// POST
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'create todo >>> '
        todolistApi.createTodo(title)
            .then((res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

// DELETE
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5ae24d3f-a671-4c80-8800-f3a5faa7b55a'
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

// PUT
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3337a60c-3a35-4069-aaea-a6fc40f12b6e'
        const title = 'React >>>'
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
