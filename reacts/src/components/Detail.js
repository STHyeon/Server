import React from "react";
import r2 from "../lib/img/r2.png";
import avatar from "../lib/img/avatar.png";
import menu from "../lib/img/menu.png";
import thumb from "../lib/img/thumbs.png";
import comment from "../lib/img/comment.png";

const Detail = () => {
    return (
        <div className="detail">
            <div className="detail_img">
                <img src={r2} />
            </div>
            <div className="detail_content">
                <div className="detail_person">
                    <img src={avatar} alt="유저" />
                    <p>작성자</p>
                    <img src={menu} alt="메뉴" className="menu" />
                </div>
                <div className="detail_text">
                    <p>sod</p>
                </div>
                <div className="detail_star">
                    <div className="detail_contents_box">
                        <p>
                            <img src={thumb} alt="good" />
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
                <div className="detail_comments">
                    <input type="text" />
                </div>
            </div>
        </div>
    );
};

export default Detail;
