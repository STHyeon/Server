import { combineReducers } from "redux";
import auth, { watchLogin } from "./auth";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    auth
});

export function* rootSaga() {
    yield all([watchLogin()]);
}

export default rootReducer;
