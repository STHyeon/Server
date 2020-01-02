import React, { createContext, useContext } from "react";
import { CommonContext } from "../context/Common";
import { Main } from "../components";

import { postLogout } from "../modules/auth";
import { getList, postWrite, getImage } from "../modules/post";
import { connect } from "react-redux";

function App({ getList, postWrite, postList, username, isLogin, getImage, imgUrl, postLogout }) {
    const onPost = formData => {
        postWrite(formData);
        getList();
    };

    const onImage = ImgName => {
        const data = {
            name: ImgName
        };
        getImage(data);
    };

    return (
        <div className="wrap">
            <CommonContext username={username} isLogin={isLogin} postLogout={postLogout}>
                <Main
                    data={postList}
                    onList={getList}
                    onPost={onPost}
                    onImage={onImage}
                    imgUrl={imgUrl}
                />
            </CommonContext>
        </div>
    );
}

export default connect(
    ({ post, auth }) => ({
        postList: post.list.postList,
        username: auth.auth.username,
        isLogin: auth.auth.isLogin,
        imgUrl: post.img.imgUrl
    }),
    {
        getList,
        postWrite,
        getImage,
        postLogout
    }
)(App);
