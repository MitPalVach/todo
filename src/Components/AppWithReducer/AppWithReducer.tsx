import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from '../Todolist/Todolist'
import {v1} from 'uuid';
import AddItemForm from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer
} from "../../store/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../../store/tasksReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithReducer() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolist, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: 'Список фильмов', filter: 'all'},
        {id: todolistId_2, title: 'Покупки', filter: 'all'},
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: v1(), title: "Бойцовский клуб", isDone: true},
            {id: v1(), title: "Крестный отец", isDone: true},
            {id: v1(), title: "Исчезнувшая", isDone: false},
            {id: v1(), title: "Пианист", isDone: false},
            {id: v1(), title: "Адвокат дьявола", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Молоко", isDone: false},
            {id: v1(), title: "Хлеб", isDone: true},
            {id: v1(), title: "Сыр", isDone: false},
            {id: v1(), title: "Творрог", isDone: true},
            {id: v1(), title: "Торт", isDone: false},
            {id: v1(), title: "Кофе", isDone: false},
        ],
    })

    const removeTask = (taskID: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(taskID, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, title, todolistId))
    }

    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchToTodolistsReducer(ChangeTodolistTitleAC(title, todolistId))
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolistsReducer(ChangeTodolistFilterAC(value, todolistId))
    }

    const todolistsComponents = todolist.map(tl => {
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
                        todolistId={tl.id}
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

