import React from "react";
import {keyType} from "./App";
import Button from "./Components/Button";
import Input from "./Components/Input";


export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
type inputType = {
    title: string
    tasks: tasksType[]
    removeTask: (id: string) => void
    changeFilter: (key: keyType) => void
    addTask: (newTitle:string) => void
}
const Todolist = (props: inputType) => {
    const changeFilterHandlerAll = () => {
        props.changeFilter('All')
    }
    const changeFilterHandlerActive = () => {
        props.changeFilter('Active')
    }
    const changeFilterHandlerCompleted = () => {
        props.changeFilter('Completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input callBack={(newTitle:string)=>props.addTask(newTitle)}/>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const removeTaskHandler = () => props.removeTask(t.id)

                    return (
                        <li key={t.id}>
                            <Button callBack={removeTaskHandler} value={'x'}/>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button callBack={changeFilterHandlerAll} value={'All'}/>
                <Button callBack={changeFilterHandlerActive} value={'Active'}/>
                <Button callBack={changeFilterHandlerCompleted} value={'Completed'}/>
            </div>
        </div>
    )
}

export default Todolist;

