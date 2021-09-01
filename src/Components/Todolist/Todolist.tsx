import React, {useCallback} from "react";
import {FilterValuesType} from "../App/App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "../Task/Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist');

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props]);
    const onFilterClickHandler = useCallback((filterValue: FilterValuesType) => () =>
        props.changeTodolistFilter(filterValue, props.todolistId), [props])
    const onClickRemoveTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props])
    const changeTodolistTitle = useCallback((title: string) =>
        props.changeTodolistTitle(title, props.todolistId), [props])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

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
            {tasksForTodolist.map(t => <Task key={t.id}
                                             removeTask={props.removeTask}
                                             changeTaskStatus={props.changeTaskStatus}
                                             changeTaskTitle={props.changeTaskTitle}
                                             task={t}
                                             todolistId={props.todolistId}
            />)}
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
})

