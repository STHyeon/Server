import React, { createContext, useContext } from "react";
import { CommonContext } from "../context/Common";
import { Main } from "../components";

import { getList, postWrite } from "../modules/post";
import { connect } from "react-redux";

function App({ getList, postWrite, postList, username, isLogin }) {
    const onPost = ({ username, content, C_img }) => {
        postWrite({ username, content, C_img });
        console.log(username, content, C_img);
    };

    return (
        <div className="wrap">
            <CommonContext username={username} isLogin={isLogin}>
                <Main data={postList} onList={getList} onPost={onPost} />
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
        postWrite
    }
)(App);
