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

const GET_IMAGE = "GET_IMAGE";
const GET_IMAGE_SUCCESS = "GET_IMAGE_SUCCESS";
const GET_IMAGE_FAILURE = "GET_IMAGE_FAILURE";

export const getImage = createAction(GET_IMAGE);

export function* getImageSaga(action) {
    try {
        const resImage = yield call(api.apiImage, action.payload);
        yield put({
            type: GET_IMAGE_SUCCESS,
            payload: resImage
        });
    } catch (err) {
        yield put({
            type: GET_IMAGE_FAILURE,
            payload: err,
            error: true
        });
    }
}

export function* watchImage() {
    yield takeLatest(GET_IMAGE, getImageSaga);
}

const initialState = {
    list: {
        status: "INIT",
        postList: [],
        error: ""
    },
    write: {
        status: "INIT",
        error: ""
    },
    img: {
        status: "INIT",
        imgUrl: ""
    }
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
                error: "갑작스런 오류"
            }
        }),
        [POST_WRITE_SUCCESS]: (state, action) => ({
            ...state,
            write: {
                status: "POST_WRITE_SUCCESS"
            }
        }),
        [POST_WRITE_FAILURE]: (state, action) => ({
            ...state,
            write: {
                status: "POST_WRITE_FAILURE",
                error: action.payload
            }
        }),
        [GET_IMAGE_SUCCESS]: (state, action) => ({
            ...state,
            img: {
                status: "GET_IMAGE_SUCCESS",
                imgUrl: action.payload.data.showImg
            }
        }),
        [GET_IMAGE_FAILURE]: (state, action) => ({
            ...state,
            img: {
                status: "GET_IMAGE_FAILURE",
                error: action.payload
            }
        })
    },
    initialState
);

export default post;
