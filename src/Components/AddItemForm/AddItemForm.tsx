import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormType = {
    addItem: (title: string) => void
}
const AddItemForm: React.FC<AddItemFormType> = React.memo((props) => {
    console.log('addItemForm');

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
// Инпут нового тудулиста и новых тасок
    return (
        <div>
            <TextField
                value={title}
                label='Введите значение'
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size={"small"}
                variant={'outlined'}
                error={error}
                helperText={error && errorMessage}
            />
            {/*Кнопки добавление нового тудулиста и новых тасок*/}
            <IconButton
                color={'primary'}
                onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
})

export default AddItemForm;