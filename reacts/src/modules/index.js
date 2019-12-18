import { combineReducers } from "redux";
import auth, { watchLogin, watchRegister } from "./auth";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    auth
});

export function* rootSaga() {
    yield all([watchLogin(), watchRegister()]);
}

export default rootReducer;
