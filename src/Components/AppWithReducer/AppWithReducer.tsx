import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from '../Todolist/Todolist'
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
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolist, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID_1, title: 'what to learn', filter: 'all'},
        {id: todolistID_2, title: 'what to buy', filter: 'all'}
    ])
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Notebook", isDone: true},
            {id: v1(), title: "Scooter", isDone: false},
            {id: v1(), title: "Car", isDone: true},
            {id: v1(), title: "BTC", isDone: false},
        ]
    })

    const removeTask = (taskID: string, todolistID: string) => {
        dispatchToTasksReducer(removeTaskAC(taskID, todolistID))
    }
    const addTask = (title: string, todolistID: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistID))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistID: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistID))
    }
    const changeTaskTitle = (taskId: string, title: string, todolistID: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, title, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        const action = RemoveTodolistAC(todolistID)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatchToTodolistsReducer(ChangeTodolistTitleAC(title, todolistID))
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistID: string) => {
        dispatchToTodolistsReducer(ChangeTodolistFilterAC(value, todolistID))
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
                        Todolists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Login</Button>
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

