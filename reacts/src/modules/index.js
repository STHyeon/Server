import { combineReducers } from "redux";
import auth, { watchLogin, watchRegister, watchLogout } from "./auth";
import post, { watchList, watchPost, watchImage } from "./post";

import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    auth,
    post
});

export function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegister(),
        watchList(),
        watchLogout(),
        watchPost(),
        watchImage()
    ]);
}

export default rootReducer;
