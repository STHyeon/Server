import { createAction, handleActions } from "redux-actions";
import { put, call, takeLatest } from "redux-saga/effects";
import * as api from "../lib/api/authApi";

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

const initialState = {
    list: {
        status: "INIT",
        postList: [],
        error: ""
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
        })
    },
    initialState
);

export default post;
