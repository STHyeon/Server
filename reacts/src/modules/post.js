import { createAction, handleActions } from "redux-actions";
import { put, call, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api/connectApi";

//list
const GET_LIST = "list/GET_LIST";
const GET_LIST_SUCCESS = "list/GET_LIST_SUCCESS";
const GET_LIST_FAILURE = "list/GET_LIST_FAILURE";

export const getList = createAction(GET_LIST);

function* getListSaga(action) {
    try {
        const resList = yield call(api.apiList);
        yield put({
            type: GET_LIST_SUCCESS,
            payload: resList
        });
    } catch (err) {
        yield put({
            type: GET_LIST_FAILURE,
            payload: err,
            error: true
        });
    }
}

export function* watchList() {
    yield takeLatest(getList, getListSaga);
}

const POST_WRITE = "post/POST_WRITE";
const POST_WRITE_SUCCESS = "post/POST_WRITE_SUCCESS";
const POST_WRITE_FAILURE = "post/POST_WRITE_FAILURE";

export const postWrite = createAction(POST_WRITE, formData => formData);

export function* postWriteSaga(action) {
    try {
        const resWrite = yield call(api.apiPost, action.payload);
        yield put({
            type: POST_WRITE_SUCCESS,
            payload: resWrite
        });
    } catch (err) {
        yield put({
            type: POST_WRITE_FAILURE,
            payload: err,
            error: true
        });
    }
}

export function* watchPost() {
    yield takeLatest(POST_WRITE, postWriteSaga);
}

const POST_DELETE = "POST_DELETE";
const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
const POST_DELETE_FAILURE = "POST_DELETE_FAILURE";

export const postDelete = createAction(POST_DELETE, ({ imgId }) => ({ imgId }));

export function* postDeleteSaga(action) {
    try {
        const resDelete = yield call(api.apiDelete, action.payload);
        yield put({
            type: POST_DELETE_SUCCESS,
            payload: resDelete
        });
    } catch (err) {
        yield put({
            type: POST_WRITE_FAILURE,
            payload: err
        });
    }
}

export function* watchDelete() {
    yield takeLatest(POST_DELETE, postDeleteSaga);
}

const POST_MODIFY = "POST_MODIFY";
const POST_MODIFY_SUCCESS = "POST_MODIFY_SUCCESS";
const POST_MODIFY_FAILURE = "POST_MODIFY_FAILURE";

export const postModify = createAction(POST_MODIFY, formData => formData);

export function* postModifySaga(action) {
    console.log(action);
    const resModify = yield call(api.apiModify, action.payload);
    console.log(resModify);
    try {
        yield put({
            type: POST_MODIFY_SUCCESS,
            payload: resModify
        });
    } catch (err) {
        yield put({
            type: POST_MODIFY_FAILURE,
            payload: err
        });
    }
}

export function* watchModify() {
    yield takeLatest(POST_MODIFY, postModifySaga);
}

const initialState = {
    list: {
        status: "INIT",
        postList: [],
        error: ""
    },
    status: "INIT",
    error: ""
};

const post = handleActions(
    {
        [GET_LIST_SUCCESS]: (state, action) => ({
            ...state,
            list: {
                status: "GET_LIST_SUCCESS",
                postList: action.payload.data.list
            }
        }),
        [GET_LIST_FAILURE]: (state, action) => ({
            ...state,
            list: {
                status: "GET_LIST_FAILURE",
                error: "서버 오류"
            }
        }),
        [POST_WRITE_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_WRITE_SUCCESS"
        }),
        [POST_WRITE_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_WRITE_FAILURE",
            error: action.payload.response.data.error
        }),
        [POST_DELETE_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_DELETE_SUCCESS"
        }),
        [POST_DELETE_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_DELETE_FAILURE",
            error: action.payload.response.data.error
        }),
        [POST_MODIFY_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_MODIFY_SUCCESS"
        }),
        [POST_MODIFY_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_MODIFY_FAILURE",
            error: action.payload.response.data.error
        })
    },
    initialState
);

export default post;
