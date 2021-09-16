// {
//     "name": "todo_zero",
//     "version": "0.1.0",
//     "private": true,
//     "dependencies": {
//     "@testing-library/jest-dom": "^5.11.4",
//         "@testing-library/react": "^11.1.0",
//         "@testing-library/user-event": "^12.1.10",
//         "@types/jest": "^26.0.15",
//         "@types/node": "^12.0.0",
//         "@types/react": "^17.0.0",
//         "@types/react-dom": "^17.0.0",
//         "@types/react-redux": "^7.1.18",
//         "@types/uuid": "^8.3.1",
//         "react": "^17.0.2",
//         "react-dom": "^17.0.2",
//         "react-redux": "^7.2.4",
//         "react-scripts": "4.0.3",
//         "redux": "^4.1.1",
//         "typescript": "^4.1.2",
//         "uuid": "^8.3.2",
//         "web-vitals": "^1.0.1"
// },
//     "scripts": {
//     "start": "react-scripts start",
//         "build": "react-scripts build",
//         "test": "react-scripts test",
//         "eject": "react-scripts eject",
//         "storybook": "start-storybook -p 6006 -s public",
//         "build-storybook": "build-storybook -s public"
// },
//     "eslintConfig": {
//     "extends": [
//         "react-app",
//         "react-app/jest"
//     ],
//         "overrides": [
//         {
//             "files": [
//                 "**/*.stories.*"
//             ],
//             "rules": {
//                 "import/no-anonymous-default-export": "off"
//             }
//         }
//     ]
// },
//     "browserslist": {
//     "production": [
//         ">0.2%",
//         "not dead",
//         "not op_mini all"
//     ],
//         "development": [
//         "last 1 chrome version",
//         "last 1 firefox version",
//         "last 1 safari version"
//     ]
// },
//     "devDependencies": {
//     "@storybook/addon-actions": "^6.3.7",
//         "@storybook/addon-essentials": "^6.3.7",
//         "@storybook/addon-links": "^6.3.7",
//         "@storybook/node-logger": "^6.3.7",
//         "@storybook/preset-create-react-app": "^3.2.0",
//         "@storybook/react": "^6.3.7"
// }
// }


























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