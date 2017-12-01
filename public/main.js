import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {ConnectedRouter, routerMiddleware, routerReducer} from "react-router-redux";
import thunk from "redux-thunk";
import createBrowserHistory from 'history/createBrowserHistory';
import rent from "../reducer/rent";
import {LocaleProvider} from "antd";
import enUS from 'antd/lib/locale-provider/en_US';


const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const allReducers = combineReducers({
    routing: routerReducer,
    rent: rent,
});

let store = createStore(allReducers, applyMiddleware(thunk, middleware));

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Router>
                <LocaleProvider locale={enUS}>
                    <Route path="/" component={App}/>
                </LocaleProvider>
            </Router>
        </ConnectedRouter>
    </Provider>

), document.getElementById('app'));