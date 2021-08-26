import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App/App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
        {/* Загаловки тудулистов*/}
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton
                onClick={onClickRemoveTodolist}
                color={'primary'}
                size={'small'}
            ><Delete/>
            </IconButton>
        </h3>

        {/*Инпут ввода новой таски*/}
        <AddItemForm addItem={addTask}/>
        {/*Имеющиеся таски*/}
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
                        <Checkbox
                            checked={t.isDone}
                            color={'primary'}
                            onChange={onChangeTaskStatusHandler}
                        />

                        <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                        <IconButton
                            onClick={onClickHandler}
                            color={'primary'}
                            size={'small'}
                        ><Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        {/*Кнопки статуса активности тасок*/}
        <div>
            <Button
                size={'small'}
                variant={props.filter === 'all' ? 'outlined' : 'contained'}
                color={props.filter === 'all' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler('all')}>Все</Button>
            <Button
                style={{'margin': '0 5px'}}
                size={'small'}
                variant={props.filter === 'active' ? 'outlined' : 'contained'}
                color={props.filter === 'active' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler('active')}>Активные</Button>
            <Button
                size={'small'}
                variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                color={props.filter === 'completed' ? 'secondary' : 'primary'}
                onClick={onFilterClickHandler('completed')}>Выполненые</Button>
        </div>
    </div>
}

