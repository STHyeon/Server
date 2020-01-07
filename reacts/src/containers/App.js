import React from "react";
import { CommonContext } from "../context/Common";
import { Main } from "../components";

import { postLogout } from "../modules/auth";
import { getList, postWrite, postDelete, postModify, postLike, postComment } from "../modules/post";
import { connect } from "react-redux";

function App({ getList, postWrite, postList, postDelete, username, isLogin, postLogout, history, postModify, postLike, error_message, error, postComment }) {
    const onPost = formData => {
        postWrite(formData);
        getList();
    };

    const onDelete = imgId => {
        postDelete({ imgId });
        setTimeout(() => {
            getList();
        }, 1000);
    };

    const onModify = formData => {
        postModify(formData);
        getList();
    };

    const onLike = (userID, postID) => {
        postLike({ userID, postID });
        setTimeout(() => {
            getList();
        }, 1500);
    };

    const onComments = (userID, postID, comments_text) => {
        postComment({ userID, postID, comments_text });
        setTimeout(() => {
            getList();
        }, 1500);
    };

    return (
        <div className="wrap">
            <CommonContext username={username} isLogin={isLogin} postLogout={postLogout} history={history} error_message={error_message} error={error}>
                <Main data={postList} onList={getList} onPost={onPost} username={username} onDelete={onDelete} onModify={onModify} onLike={onLike} onComments={onComments} />
            </CommonContext>
        </div>
    );
}

export default connect(
    ({ post, auth }) => ({
        postList: post.postList,
        error_message: post.error_message,
        error: post.error,
        username: auth.auth.username,
        isLogin: auth.auth.isLogin
    }),
    {
        getList,
        postWrite,
        postLogout,
        postDelete,
        postModify,
        postLike,
        postComment
    }
)(App);
