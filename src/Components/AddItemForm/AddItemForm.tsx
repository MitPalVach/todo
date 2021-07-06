import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormType = {
    addItem: (title: string) => void
}
const AddItemForm: React.FC<AddItemFormType> = (props) => {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const errorMessage = 'Title is required'

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div style={{color: 'red'}}>{errorMessage}</div>}
        </div>
    );
};

export default AddItemForm;