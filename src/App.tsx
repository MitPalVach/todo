import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type keyType =
    'All' | 'Active' | 'Completed'


function App() {

    let [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "HTML&CSS", isDone: true},
        {id: 5, title: "JS", isDone: true},
        {id: 6, title: "ReactJS", isDone: false}
    ])

    let [filter, setFilter] = useState<keyType>('All')
    const removeTasks = (id: number) => {
        tasks1 = tasks1.filter(t1 => t1.id !== id)
        setTasks1(tasks1)
        console.log(tasks1)
    }

    const changeFilter = (key: keyType) => {
        console.log(key)
        setFilter(key)
    }

    let copyTasks1 = tasks1;

    if (filter === 'Active') {
        copyTasks1 = tasks1.filter(t => !t.isDone)
    }
    if (filter === 'Completed') {
        copyTasks1 = tasks1.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={copyTasks1}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;








