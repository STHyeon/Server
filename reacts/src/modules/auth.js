import { createAction, handleActions } from "redux-actions";
import { put, call, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api/authApi";

const POST_REGISTER = "auth/POST_REGISTER";
const POST_REGISTER_SUCCESS = "auth/POST_REGISTER_SUCCESS";
const POST_REGISTER_FAILURE = "auth/POST_REGISTER_FAILURE";

const POST_LOGIN = "auth/POST_LOGIN";
const POST_LOGIN_SUCCESS = "auth/POST_LOGIN_SUCCESS";
const POST_LOGIN_FAILURE = "auth/POST_LOGIN_FAILURE";

//export const postRegister = text => ({ type: POST_REGISTER, payload: text })
export const postRegister = createAction(POST_REGISTER);
export const postLogin = createAction(POST_LOGIN, ({ username, password }) => ({
    username,
    password
}));

function* postLoginSaga(action) {
    try {
        const resLogin = yield call(api.apiLogin, action.payload);
        yield put({
            type: POST_LOGIN_SUCCESS,
            payload: resLogin
        });
    } catch (err) {
        yield put({
            type: POST_LOGIN_FAILURE,
            payload: err,
            error: true
        });
    }
}

export function* watchLogin() {
    yield takeLatest(POST_LOGIN, postLoginSaga);
}

const initialState = {
    auth: {
        status: "INIT",
        message: "",
        error: false
    }
};

const auth = handleActions(
    {
        [POST_LOGIN_SUCCESS]: (state, action) => ({
            ...state,
            auth: {
                status: "SUCCESS"
            }
        }),

        [POST_LOGIN_FAILURE]: (state, action) => ({
            ...state,
            auth: {
                status: "FAILURE",
                message: action.payload.response.data.error,
                error: true
            }
        })
    },
    initialState
);

export default auth;
