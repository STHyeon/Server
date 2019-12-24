import React, { useState } from "react";
import html2canvas from "html2canvas";
import w1 from "../lib/img/writeback1.png";
import { postWrite } from "../modules/post";
import { connect } from "react-redux";

const Write = props => {
    console.log(props);
    const Capture = () => {
        html2canvas(document.getElementById("capture")).then(function(canvas) {
            const image = canvas.toDataURL("image/png");
            const iframe = "<iframe width='100%' height='100%' src='" + image + "'></iframe>";
            const win = window.open();
            win.document.open();
            win.document.write(iframe);
            win.document.close();
            // window.open(image, "_blank");
        });
    };

    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [content, setContent] = useState("");

    const handlePost = () => {
        props.onPost({ username, content });
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
                <div className="write_text_box">
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
                    <input type="hidden" />
                    <button
                        onClick={() => {
                            // Capture();
                            handlePost();
                        }}
                    >
                        올리기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Write;
