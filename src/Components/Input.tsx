import React, {ChangeEvent, useState, KeyboardEvent} from "react";


type inputType = {
    callBack: (newTitle:string) => void
}
const Input = (props: inputType) => {
    let [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onClickHandler = () => {
        props.callBack(title)
        setTitle('')
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <input onChange={onChangeHandler} value={title} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
    )
}

export default Input;