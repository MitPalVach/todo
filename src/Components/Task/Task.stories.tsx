import React from "react";
import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {v1} from "uuid";
import {todolistId_1, todolistId_2} from "../../store/todolistReducer";


export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatus = action('Task status change')
const changeTaskTitle = action('Task title changed')
const removeTask = action('Remove task')

export const TaskBaseExample = (props: any) => {
    return <>
        <Task removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
              task={{id: v1(), isDone: true, title: 'CSS'}}
              todolistId={todolistId_1}
        />
        <Task removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
              task={{id: v1(), isDone: false, title: 'JS'}}
              todolistId={todolistId_2}
        />
    </>
}