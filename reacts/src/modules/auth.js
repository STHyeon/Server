import { createAction, handleActions } from "redux-actions";
import { put, call, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api/authApi";
// import { push } from "react-router-redux";
import history from "../lib/utils/history";

//register
const POST_REGISTER = "auth/POST_REGISTER";
const POST_REGISTER_SUCCESS = "auth/POST_REGISTER_SUCCESS";
const POST_REGISTER_FAILURE = "auth/POST_REGISTER_FAILURE";

export const postRegister = createAction(POST_REGISTER, ({ username, password, password2 }) => ({
    username,
    password,
    password2
}));

function* postRegisterSaga(action) {
    try {
        const resRegister = yield call(api.apiRegister, action.payload);
        yield put({
            type: POST_REGISTER_SUCCESS,
            payload: resRegister
        });
        // history.replace("/");
    } catch (err) {
        yield put({
            type: POST_REGISTER_FAILURE,
            payload: err,
            error: true
        });
    }
    // yield put(push("/"));
}

export function* watchRegister() {
    yield takeLatest(POST_REGISTER, postRegisterSaga);
}

//login
const POST_LOGIN = "auth/POST_LOGIN";
const POST_LOGIN_SUCCESS = "auth/POST_LOGIN_SUCCESS";
const POST_LOGIN_FAILURE = "auth/POST_LOGIN_FAILURE";

//export const postRegister = text => ({ type: POST_REGISTER, payload: text })
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
        history.push("/");
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
                status: "LOGIN_SUCCESS"
            }
        }),

        [POST_LOGIN_FAILURE]: (state, action) => ({
            ...state,
            auth: {
                status: "LOGIN_FAILURE",
                message: action.payload.response.data.error,
                error: true
            }
        }),

        [POST_REGISTER_FAILURE]: (state, action) => ({
            ...state,
            auth: {
                status: "REGISTER_SUCCESS"
            }
        }),

        [POST_REGISTER_FAILURE]: (state, action) => ({
            ...state,
            auth: {
                status: "REGISTER_FAILURE",
                message: action.payload.response.data.error,
                error: true
            }
        })
    },
    initialState
);

export default auth;
