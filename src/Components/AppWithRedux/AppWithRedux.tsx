import React from 'react';
import './App.css';
import {TaskType, Todolist} from '../Todolist/Todolist'
import AddItemForm from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC,
} from "../../store/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskID: string, todolistID: string) => {
        dispatch(removeTaskAC(taskID, todolistID))
    }
    const addTask = (title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }
    const changeTaskTitle = (taskId: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID))
    }
    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title))
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatch(ChangeTodolistTitleAC(title, todolistID))
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistID: string) => {
        dispatch(ChangeTodolistFilterAC(value, todolistID))
    }

    const todolistsComponents = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <Todolist
                        todolistID={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    // GUI
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Списки
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Войти</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;

