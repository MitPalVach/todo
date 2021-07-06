import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Components/Todolist/Todolist'
import {v1} from 'uuid';
import AddItemForm from "./Components/AddItemForm/AddItemForm";


export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'what to learn', filter: 'all'},
        {id: todolistID_2, title: 'what to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        )
    })
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistsComponents}
        </div>
    )
}

export default App;

