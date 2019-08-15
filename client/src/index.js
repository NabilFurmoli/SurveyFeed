

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App';

// redux setup realted imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'; // this is where reducers are combined and imported.
import reduxThunk from 'redux-thunk';

// these two line are just for email testing backend
// import axios from 'axios';
// window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
 document.querySelector('#root'));


 //lightColor="#e6fff8"
 //DarkColor = "#00e6a8"
