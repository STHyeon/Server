import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { App, Login, Register, Test1 } from "./containers";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";

//redux
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger/src";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/test" component={Test1} />
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
