import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}
const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
// Возможность изменить название тасок и тудулистов
    return (
        editMode ? (
                <TextField
                    autoFocus
                    value={title}
                    onBlur={offEditMode}
                    onChange={onChangeHandler}
                />)
            : (<span onDoubleClick={onEditMode}>{props.title}</span>)
    )
};

export default EditableSpan;