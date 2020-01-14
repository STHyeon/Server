import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import w1 from "../lib/img/writeback1.png";
import w2 from "../lib/img/writeback2.png";
import w3 from "../lib/img/writeback3.png";

const Form = props => {
    useEffect(() => {
        setRandomRes(randomNum());
    }, []);

    const { formMode } = props;
    const [P_id] = useState(formMode ? "" : props.data.dataList._id);
    const [T_Image, setT_Image] = useState(formMode ? "" : props.data.dataList.img_text);
    const [username] = useState(props.username);
    const [content, setContent] = useState(formMode ? "" : props.data.dataList.img_text);
    const [img, setC_img] = useState(null);
    let image;
    const Capture = () => {
        html2canvas(document.getElementById("capture")).then(function(canvas) {
            image = canvas.toDataURL("image/png");
            setC_img(image);
        });
    };

    const [textHeight, setTextHeight] = useState("");
    const handleTextArea = e => {
        setTextHeight(`${e.target.scrollHeight}px`);
        e.target.style.height = textHeight;
    };

    const randomNum = () => {
        const min = Math.ceil(0);
        const max = Math.floor(3);
        return Math.floor(Math.random() * (max - min)) + min; // 최댓값 제외 , 최솟값 포함
    };

    const [randomRes, setRandomRes] = useState(0);
    let imgList = [w1, w2, w3];

    const formData = new FormData();
    formData.append("id", P_id);
    formData.append("img", img);
    formData.append("username", username);
    formData.append("content", content);
    formData.append("img_num", randomRes);
    formData.append("img_text", T_Image);

    const postSelect = e => {
        if (formMode) {
            props.onPost(e);
        } else {
            props.onModify(e);
        }
    };

    const handlePost = e => {
        e.preventDefault();
        postSelect(formData);
        props.setFormMode(true);
        props.setDetailToggle(false);
        props.setWriteToggle(false);
        props.setIsOpen(false);
    };

    return (
        <div className="write">
            <div className="inner">
                <h1>
                    {formMode ? (
                        <div>
                            오늘의 글을 써주세요 <span>(사진은 랜덤입니다.)</span>
                        </div>
                    ) : (
                        <p>수정하기</p>
                    )}
                </h1>
                <div className="write_img_box">
                    <div id="capture">
                        <div className="input_box">
                            <textarea
                                placeholder="사진 속에 들어갈 내용을 써주세요."
                                value={T_Image}
                                onChange={({ target: { value } }) => {
                                    setT_Image(value);
                                }}
                                onKeyDown={handleTextArea}
                            ></textarea>
                        </div>
                        <img src={formMode ? imgList[randomRes] : imgList[props.data.dataList.img_num]} alt="writeback" />
                    </div>
                </div>
                <form className="write_text_box" encType="multipart/form-data" onSubmit={handlePost}>
                    <div className="input_box">
                        <textarea
                            placeholder="내용을 작성해주세요."
                            value={content}
                            onChange={({ target: { value } }) => {
                                setContent(value);
                            }}
                            onKeyDown={handleTextArea}
                        ></textarea>
                        <button type="button" onClick={Capture}>
                            <span>캡쳐</span>
                        </button>
                        <button type="submit">올리기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
