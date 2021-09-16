import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../store/tasksReducer";
import {v1} from "uuid";
import {AppRootState} from "../store/store";
import {todolistId_1, todolistId_2, todolistsReducer} from "../store/todolistReducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {
    todolists: [
        {todolistId: todolistId_1, title: 'Список фильмов', filter: 'all'},
        {todolistId: todolistId_1, title: 'Список фильмов', filter: 'all'},
    ],
    tasks: {
        [todolistId_1]: [
            {id: v1(), title: "Бойцовский клуб", isDone: true},
            {id: v1(), title: "Крестный отец", isDone: true},
            {id: v1(), title: "Исчезнувшая", isDone: false},
            {id: v1(), title: "Адвокат дьявола", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Молоко", isDone: false},
            {id: v1(), title: "Хлеб", isDone: true},
        ],
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (story: any) => (
    <Provider store={storyBookStore}> {story()} </Provider>
)

