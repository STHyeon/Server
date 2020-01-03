import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import w1 from "../lib/img/writeback1.png";
import w2 from "../lib/img/writeback2.png";
import w3 from "../lib/img/writeback3.png";

const Write = props => {
    const [username] = useState(props.username);
    const [content, setContent] = useState("");
    const [img, setC_img] = useState(null);
    let image;
    const Capture = () => {
        html2canvas(document.getElementById("capture")).then(function(canvas) {
            image = canvas.toDataURL("image/png");
            setC_img(image);
        });
    };

    const formData = new FormData();
    formData.append("img", img);
    formData.append("username", username);
    formData.append("content", content);

    const handlePost = e => {
        e.preventDefault();
        // Capture();
        // setTimeout(function() {
        props.onPost(formData);
        props.setWriteToggle(false);
        props.setIsOpen(false);
        // }, 3000);
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

    useEffect(() => {
        setRandomRes(randomNum());
    }, []);

    const [T_Image, setT_Image] = useState("");
    return (
        <div className="write">
            <div className="inner">
                <h1>
                    오늘의 글을 써주세요 <span>(사진은 랜덤입니다.)</span>
                </h1>
                <div className="write_img_box">
                    <div id="capture">
                        <div className="input_box">
                            <textarea
                                placeholder="사진 속에 들어갈 내용을 써주세요."
                                value={T_Image}
                                onChange={({ target: { value } }) => setT_Image(value)}
                                onKeyDown={handleTextArea}
                            ></textarea>
                        </div>
                        <img src={imgList[randomRes]} alt="writeback" />
                    </div>
                </div>
                <form
                    className="write_text_box"
                    encType="multipart/form-data"
                    onSubmit={handlePost}
                >
                    <div className="input_box">
                        <textarea
                            placeholder="내용을 작성해주세요."
                            value={content}
                            onChange={({ target: { value } }) => setContent(value)}
                            onKeyDown={handleTextArea}
                        ></textarea>
                        <button type="button" onClick={Capture}>
                            임시 캡쳐
                        </button>
                        <button type="submit">올리기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Write;
