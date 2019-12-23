import React, { createContext, useContext } from "react";
import { CommonContext } from "../context/Common";
import { Main } from "../components";
import { Common } from "../components";

import { getList } from "../modules/post";
import { connect } from "react-redux";

function App({ getList, postList, username, isLogin }) {
    return (
        <div className="wrap">
            <CommonContext username={username} isLogin={isLogin}>
                <Main data={postList} onList={getList} />
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
        getList
    }
)(App);
