import React, { useState, useEffect } from "react";
import avatar from "../lib/img/avatar.png";
import menu from "../lib/img/menu.png";
import thumb from "../lib/img/thumbs.png";
import comment from "../lib/img/comment.png";
import like from "../lib/img/like.png";

const Detail = props => {
    const [openMenu, setOpenMenu] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [likeCount, setLikeCount] = useState(props.data.dataList.likes.length);
    const [commentsCount, setCommentsCount] = useState(props.data.dataList.comments.length);
    const [comments_text, setComments_Text] = useState("");
    const [commentBox, setCommentBox] = useState(props.data.dataList.comments);

    useEffect(() => {
        for (const i in props.data.dataList.likes) {
            if (props.data.dataList.likes[i] === props.username) {
                console.log("있다");
                setLikeState(true);
            } else {
                console.log("없다");
                setLikeState(false);
            }
        }
    }, []);

    useEffect(() => {
        if (props.detail_data != "") {
            setLikeCount(props.detail_data.likes.length);
            setCommentsCount(props.detail_data.comments.length);
            setCommentBox(props.detail_data.comments);

            for (const i in props.detail_data.likes) {
                console.log(props.detail_data.likes);
                if (props.detail_data.likes[i] === props.username) {
                    console.log("디테일 있다");
                    setLikeState(true);
                } else {
                    console.log("디테일 없다");
                    setLikeState(false);
                }
            }
        }
    }, [props.detail_data]);

    const handleComments = () => {
        props.onComments(props.username, props.data.dataList._id, comments_text);
        setComments_Text("");
    };

    const CommentBoxes = props => {
        return (
            <div>
                <span>
                    <img src={avatar} alt="avatar" />
                </span>
                <p>{props.commentsList.comment}</p>
            </div>
        );
    };

    const comment_map = commentBox.map((comment_list, index) => <CommentBoxes key={index} commentsList={comment_list} />);

    return (
        <div className="detail">
            <div className="detail_img">
                <img src={props.data.dataList.img} alt="글사진" />
            </div>
            <div className="detail_content">
                <div className="detail_wrapper">
                    <div className="detail_person">
                        <img src={avatar} alt="유저" />
                        <p>{props.data.dataList.author}</p>
                        <div className="menu">
                            <img
                                src={menu}
                                alt="메뉴"
                                onClick={() => {
                                    setOpenMenu(!openMenu);
                                }}
                            />
                            <ul className={openMenu ? "optionMenu" : "display_none"}>
                                <li
                                    onClick={() => {
                                        props.setFormMode(false);
                                        props.setWriteToggle(true);
                                    }}
                                >
                                    수정
                                </li>
                                <li
                                    onClick={() => {
                                        props.onDelete(props.data.dataList.origin);
                                        setTimeout(() => {
                                            props.setIsOpen(false);
                                            props.setDetailToggle(false);
                                        }, 500);
                                    }}
                                >
                                    삭제
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="detail_text">
                        <p>{props.data.dataList.content}</p>
                    </div>
                    <div className="detail_star">
                        <div className="detail_contents_box">
                            <p
                                onClick={() => {
                                    props.onLike(props.username, props.data.dataList._id);
                                }}
                            >
                                {likeState ? <img src={like} alt="like" className="like_on" /> : <img src={thumb} alt="good" className="like_on" />}
                                <span>{likeCount}</span>
                            </p>
                        </div>
                        <div className="detail_contents_box">
                            <p>
                                <img src={comment} alt="comment" />
                                <span>{commentsCount}</span>
                            </p>
                        </div>
                    </div>
                    <div className="detail_comments_box">
                        <div className="detail_comments_content">{comment_map}</div>
                    </div>
                </div>
                <div className="detail_comments_input">
                    <div className="detail_comments_wrapper">
                        <img src={avatar} alt="avatar" />
                        <input type="text" placeholder="댓글을 입력해주세요." value={comments_text} onChange={({ target: { value } }) => setComments_Text(value)} />
                        <button onClick={handleComments}>보내기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
