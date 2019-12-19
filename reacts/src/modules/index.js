import { combineReducers } from "redux";
import auth, { watchLogin, watchRegister } from "./auth";
import post, { watchList } from "./post";

import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    auth,
    post
});

export function* rootSaga() {
    yield all([watchLogin(), watchRegister(), watchList()]);
}

export default rootReducer;
