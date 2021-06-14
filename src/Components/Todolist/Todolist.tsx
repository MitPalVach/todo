import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "../../App";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
        } else {
            setError('Need title')
        }
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onFilterClickHandler = (filterValue: FilterValuesType) => () => props.changeFilter(filterValue);

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={error ? '' : 'error-message'}>Field is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(t.id, e.currentTarget.checked);

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                        <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onFilterClickHandler('all')}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onFilterClickHandler('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onFilterClickHandler('completed')}>Completed
            </button>
        </div>
    </div>
}

