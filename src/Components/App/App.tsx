import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from '../Todolist/Todolist'
import {v1} from 'uuid';
import AddItemForm from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {todolistID_1, todolistID_2} from "../../store/todolistReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'Список фильмов', filter: 'all'},
        {id: todolistID_2, title: 'Покупки', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "Бойцовский клуб", isDone: true},
            {id: v1(), title: "Крестный отец", isDone: true},
            {id: v1(), title: "Исчезнувшая", isDone: false},
            {id: v1(), title: "Пианист", isDone: false},
            {id: v1(), title: "Адвокат дьявола", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Молоко", isDone: false},
            {id: v1(), title: "Хлеб", isDone: true},
            {id: v1(), title: "Сыр", isDone: false},
            {id: v1(), title: "Творрог", isDone: true},
            {id: v1(), title: "Торт", isDone: false},
            {id: v1(), title: "Кофе", isDone: false},
        ],
    })

    const removeTask = (taskID: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }
    const addTask = (title: string, todolistID: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todolistID] = [newTask, ...tasks[todolistID]];
        setTasks({...tasks});
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => {
            if (t.id === taskId) {
                return {...t, isDone: isDone}
            }
            return t
        })
        setTasks({...tasks})
    }
    const changeTaskTitle = (taskId: string, title: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => {
            if (t.id === taskId) {
                return {...t, title}
            }
            return t
        })
        setTasks({...tasks})
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistID: string) => {
        setTodolist(todolist.map(tl =>
            tl.id === todolistID ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {
            id: newTodolistID,
            title,
            filter: 'all'
        }
        setTodolist([...todolist, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        const updatedTodolist = todolist.map(tl => {
            if (tl.id === todolistID) {
                return {...tl, title}
            }
            return tl
        })
        setTodolist(updatedTodolist)
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

