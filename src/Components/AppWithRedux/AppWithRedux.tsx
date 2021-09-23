import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../Todolist/Todolist'
import AddItemForm from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskTC
} from "../../store/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValuesType,
    RemoveTodolistAC,
    setTodolistsTC,
    TodolistDomainType
} from "../../store/todolistReducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, taskId))
    }, []);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    }, []);

    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId);
        dispatch(action);
    }, []);
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, []);
    const changeTodolistFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);
    const removeTodolist = useCallback(function (id: string) {
        const action = RemoveTodolistAC(id);
        dispatch(action);
    }, []);
    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = ChangeTodolistTitleAC(id, title);
        dispatch(action);
    }, []);
    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const todolistsComponents = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <Todolist
                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeTodolistFilter}
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

export default App;