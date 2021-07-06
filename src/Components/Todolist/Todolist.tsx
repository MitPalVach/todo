import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistID: string
    removeTask: (taskId: string, todolistID: string) => void
    changeTodolistFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.todolistID);
    }
    const onFilterClickHandler = (filterValue: FilterValuesType) => () =>
        props.changeTodolistFilter(filterValue, props.todolistID);
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todolistID)


    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <button onClick={onClickRemoveTodolist}>x
            </button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                    const changeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todolistID)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onFilterClickHandler('all')}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onFilterClickHandler('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onFilterClickHandler('completed')}>Completed
            </button>
        </div>
    </div>
}

