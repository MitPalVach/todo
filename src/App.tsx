import React, {useState} from 'react';
import './App.css';
import Todolist, {tasksType} from "./Todolist";
import {v1} from 'uuid';


export type keyType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState<tasksType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    let [filter, setFilter] = useState<keyType>('All')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(key: keyType) {
        setFilter(key);
    }

    function addTask(newTitle:string) {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let copyTasks = tasks;
    if (filter === 'Active') {
        copyTasks = copyTasks.filter(t => !t.isDone)
    }
    if (filter === 'Completed') {
        copyTasks = copyTasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={copyTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;



