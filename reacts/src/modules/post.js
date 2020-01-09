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
    yield takeLatest(GET_LIST, getListSaga);
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
    const resModify = yield call(api.apiModify, action.payload);
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

const POST_LIKE = "POST_LIKE";
const POST_LIKE_SUCCESS = "POST_LIKE_SUCCESS";
const POST_LIKE_FAILURE = "POST_LIKE_FAILURE";

export const postLike = createAction(POST_LIKE, ({ userID, postID }) => ({ userID, postID }));

export function* postLikeSaga(action) {
    try {
        const resLike = yield call(api.apiLike, action.payload);
        yield put({
            type: POST_LIKE_SUCCESS,
            payload: resLike
        });
    } catch (err) {
        yield put({
            type: POST_LIKE_FAILURE,
            payload: err
        });
    }
}

export function* watchLike() {
    yield takeLatest(POST_LIKE, postLikeSaga);
}

const POST_COMMENTS = "POST_COMMENTS";
const POST_COMMENTS_SUCCESS = "POST_COMMENTS_SUCCESS";
const POST_COMMENTS_FAILURE = "POST_COMMENTS_FAILURE";

export const postComment = createAction(POST_COMMENTS, ({ userID, postID, comments_text }) => ({ userID, postID, comments_text }));

export function* postCommentSaga(action) {
    try {
        const resCOMMENTS = yield call(api.apiComment, action.payload);
        yield put({
            type: POST_COMMENTS_SUCCESS,
            payload: resCOMMENTS
        });
    } catch (err) {
        yield put({
            type: POST_COMMENTS_FAILURE,
            payload: err
        });
    }
}

export function* watchComment() {
    yield takeLatest(POST_COMMENTS, postCommentSaga);
}

const initialState = {
    postList: [],
    postDetailList: [],
    status: "INIT",
    error_message: "",
    error: false
};

const post = handleActions(
    {
        [GET_LIST_SUCCESS]: (state, action) => ({
            ...state,
            status: "GET_LIST_SUCCESS",
            postList: action.payload.data.list,
            error_message: "",
            error: false
        }),
        [GET_LIST_FAILURE]: (state, action) => ({
            ...state,
            status: "GET_LIST_FAILURE",
            error_message: "서버 오류",
            error: true
        }),
        [POST_WRITE_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_WRITE_SUCCESS",
            error_message: "",
            error: false
        }),
        [POST_WRITE_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_WRITE_FAILURE",
            error_message: action.payload.response.data.error,
            error: true
        }),
        [POST_DELETE_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_DELETE_SUCCESS",
            error_message: "",
            error: false
        }),
        [POST_DELETE_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_DELETE_FAILURE",
            error_message: action.payload.response.data.error,
            error: true
        }),
        [POST_MODIFY_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_MODIFY_SUCCESS",
            error_message: "",
            error: false
        }),
        [POST_MODIFY_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_MODIFY_FAILURE",
            error_message: action.payload.response.data.error,
            error: true
        }),
        [POST_LIKE_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_LIKE_SUCCESS",
            postDetailList: action.payload.data.success,
            error_message: "",
            error: false
        }),
        [POST_LIKE_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_LIKE_FAILURE",
            error_message: action.payload.response.data.error,
            error: true
        }),
        [POST_COMMENTS_SUCCESS]: (state, action) => ({
            ...state,
            status: "POST_COMMENTS_SUCCESS",
            postDetailList: action.payload.data.success,
            error_message: "",
            error: false
        }),
        [POST_COMMENTS_FAILURE]: (state, action) => ({
            ...state,
            status: "POST_COMMENTS_FAILURE",
            error_message: action.payload.response.data.error,
            error: true
        })
    },
    initialState
);

export default post;
