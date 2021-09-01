import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from '../Todolist/Todolist'
import {v1} from 'uuid';
import AddItemForm from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'Список фильмов', filter: 'all'},
        {id: todolistId_2, title: 'Покупки', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todolistId] = [newTask, ...tasks[todolistId]];
        setTasks({...tasks});
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => {
            if (t.id === taskId) {
                return {...t, isDone: isDone}
            }
            return t
        })
        setTasks({...tasks})
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => {
            if (t.id === taskId) {
                return {...t, title}
            }
            return t
        })
        setTasks({...tasks})
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolist(todolist.map(tl =>
            tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const newtodolistId = v1()
        const newTodolist: TodolistType = {
            id: newtodolistId,
            title,
            filter: 'all'
        }
        setTodolist([...todolist, newTodolist])
        setTasks({...tasks, [newtodolistId]: []})
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        const updatedTodolist = todolist.map(tl => {
            if (tl.id === todolistId) {
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

export default App;

