import React, { useState } from "react";
import html2canvas from "html2canvas";
import w1 from "../lib/img/writeback1.png";
import { postWrite } from "../modules/post";
import { connect } from "react-redux";

const Write = props => {
    let image;
    const Capture = () => {
        html2canvas(document.getElementById("capture")).then(function(canvas) {
            image = canvas.toDataURL("image/png");
        });
    };

    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [content, setContent] = useState("");
    const [img, setC_img] = useState(null);

    const formData = new FormData();
    formData.append("img", img);
    formData.append("username", username);
    formData.append("content", content);

    const handlePost = e => {
        e.preventDefault();
        props.onPost(formData);
    };

    const [T_Image, setT_Image] = useState("");
    return (
        <div className="write">
            <div className="inner">
                <h1>오늘의 글을 써주세요</h1>
                <div id="capture" className="write_img_box">
                    <p>{T_Image}</p>
                    <img src={w1} alt="writeback" />
                </div>
                <form
                    className="write_text_box"
                    encType="multipart/form-data"
                    onSubmit={handlePost}
                >
                    <div className="input_box">
                        <textarea
                            placeholder="사진 속에 들어갈 내용을 써주세요."
                            value={T_Image}
                            onChange={({ target: { value } }) => setT_Image(value)}
                        ></textarea>
                    </div>
                    <div className="input_box">
                        <textarea
                            placeholder="내용을 작성해주세요."
                            value={content}
                            onChange={({ target: { value } }) => setContent(value)}
                        ></textarea>
                    </div>
                    <input
                        type="file"
                        name="img"
                        onChange={({ target: { files } }) => setC_img(files[0])}
                    />
                    <button
                        type="submit"
                        // onClick={() => {
                        //     // Capture();
                        //     handlePost();
                        // }}
                    >
                        올리기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Write;
