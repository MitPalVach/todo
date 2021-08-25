import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithReducer from "./Components/AppWithReducer/AppWithReducer";
import App from './Components/App/App'
import AppWithRedux from "./Components/AppWithRedux/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>,
    document.getElementById('root'));

