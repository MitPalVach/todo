import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../Todolist/Todolist";


type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
const Task = React.memo((props: TaskPropsType) => {
    console.log('task');

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    const changeTaskTitleHandler = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }
    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            color={'primary'}
            onChange={onChangeTaskStatusHandler}
        />

        <EditableSpan title={props.task.title} changeTitle={changeTaskTitleHandler}/>
        <IconButton
            onClick={onClickHandler}
            color={'primary'}
            size={'small'}
        ><Delete/>
        </IconButton>
    </li>
})

export default Task;