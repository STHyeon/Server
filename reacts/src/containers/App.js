import React from "react";
import { CommonContext } from "../context/Common";
import { Main } from "../components";

import { postLogout } from "../modules/auth";
import { getList, postWrite, postDelete } from "../modules/post";
import { connect } from "react-redux";

function App({ getList, postWrite, postList, postDelete, username, isLogin, postLogout, history }) {
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

    return (
        <div className="wrap">
            <CommonContext username={username} isLogin={isLogin} postLogout={postLogout} history={history}>
                <Main data={postList} onList={getList} onPost={onPost} username={username} onDelete={onDelete} />
            </CommonContext>
        </div>
    );
}

export default connect(
    ({ post, auth }) => ({
        postList: post.list.postList,
        username: auth.auth.username,
        isLogin: auth.auth.isLogin
    }),
    {
        getList,
        postWrite,
        postLogout,
        postDelete
    }
)(App);
