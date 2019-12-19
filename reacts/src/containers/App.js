import React from "react";
import { Main } from "../components";
import Common from "./Common";

import { getList } from "../modules/post";
import { connect } from "react-redux";

function App({ getList, postList }) {
    return (
        <div>
            <div className="wrap">
                <Common>
                    <Main data={postList} onList={getList} />
                </Common>
            </div>
        </div>
    );
}

export default connect(
    ({ post }) => ({
        postList: post.list.postList
    }),
    {
        getList
    }
)(App);
