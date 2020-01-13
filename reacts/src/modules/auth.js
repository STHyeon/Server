import { createAction, handleActions } from "redux-actions";
import { put, call, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api/connectApi";

//register
const POST_REGISTER = "auth/POST_REGISTER";
const POST_REGISTER_SUCCESS = "auth/POST_REGISTER_SUCCESS";
const POST_REGISTER_FAILURE = "auth/POST_REGISTER_FAILURE";

export const postRegister = createAction(POST_REGISTER, ({ username, password, password2, history }) => ({
    username,
    password,
    password2,
    history
}));

function* postRegisterSaga(action) {
    const { history } = action.payload;
    try {
        const resRegister = yield call(api.apiRegister, action.payload);
        yield put({
            type: POST_REGISTER_SUCCESS,
            payload: resRegister
        });
        history.push("/login");
    } catch (err) {
        console.log(err);
        yield put({
            type: POST_REGISTER_FAILURE,
            payload: err,
            error: true
        });
    }
}

export function* watchRegister() {
    yield takeLatest(POST_REGISTER, postRegisterSaga);
}

//login
const POST_LOGIN = "auth/POST_LOGIN";
const POST_LOGIN_SUCCESS = "auth/POST_LOGIN_SUCCESS";
const POST_LOGIN_FAILURE = "auth/POST_LOGIN_FAILURE";

export const postLogin = createAction(POST_LOGIN, ({ username, password, history }) => ({
    username,
    password,
    history
}));

function* postLoginSaga(action) {
    try {
        const resLogin = yield call(api.apiLogin, action.payload);
        const { history } = action.payload;
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

const POST_LOGOUT = "POST_LOGOUT";
const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
const POST_LOGOUT_FAILURE = "POST_LOGOUT_FAILURE";

export const postLogout = createAction(POST_LOGOUT);

export function* postLogoutSaga() {
    try {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        yield put({
            type: POST_LOGOUT_SUCCESS
        });
    } catch (err) {
        yield put({
            type: POST_LOGOUT_FAILURE,
            payload: err
        });
    }
}

export function* watchLogout() {
    yield takeLatest(POST_LOGOUT, postLogoutSaga);
}

const initialState = {
    auth: {
        status: "INIT",
        message: "",
        error: false,
        username: "",
        isLogin: "",
        token: ""
    }
};

const auth = handleActions(
    {
        [POST_LOGIN_SUCCESS]: (state, action) => ({
            ...state,
            auth: {
                status: "LOGIN_SUCCESS",
                username: action.payload.data.username,
                token: action.payload.data.token
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

        [POST_REGISTER_SUCCESS]: (state, action) => ({
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
        }),
        [POST_LOGOUT_SUCCESS]: (state, action) => ({
            ...state,
            auth: {
                status: "LOGOUT_SUCCESS",
                username: "",
                token: ""
            }
        })
    },
    initialState
);

export default auth;
