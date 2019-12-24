import React from "react";
import r2 from "../lib/img/r2.png";
import avatar from "../lib/img/avatar.png";
import menu from "../lib/img/menu.png";
import thumb from "../lib/img/thumbs.png";
import comment from "../lib/img/comment.png";
import like from "../lib/img/like.png";

const Detail = props => {
    console.log(props);
    return (
        <div className="detail">
            <div className="detail_img">
                {/* <img src={r2} /> */}
                {props.data.dataList.img}
                <img src={props.data.dataList.img} alt="글사진" />
            </div>
            <div className="detail_content">
                <div className="detail_person">
                    <img src={avatar} alt="유저" />
                    <p>{props.data.dataList.author}</p>
                    <img src={menu} alt="메뉴" className="menu" />
                </div>
                <div className="detail_text">
                    <p>{props.data.dataList.content}</p>
                </div>
                <div className="detail_star">
                    <div className="detail_contents_box">
                        <p>
                            <img src={thumb} alt="good" className="like_off" />
                            <img src={like} alt="like" className="like_on" />
                            <span>315</span>
                        </p>
                    </div>
                    <div className="detail_contents_box">
                        <p>
                            <img src={comment} alth="comment" />
                            <span>33</span>
                        </p>
                    </div>
                </div>
                <div className="detail_comments_box">
                    <div className="detail_comments_content">
                        <div>
                            <span>
                                <img src={avatar} alt="avatar" />
                            </span>
                            <p>aaaaaaa</p>
                        </div>
                        <div>
                            <span>
                                <img src={avatar} alt="avatar" />
                            </span>
                            <p>aaaaaaa</p>
                        </div>
                    </div>
                    <div className="detail_comments_input">
                        <span>
                            <img src={avatar} alt="avatar" />
                        </span>
                        <input type="text" placeholder="댓글을 입력해주세요." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
