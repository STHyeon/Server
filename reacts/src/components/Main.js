import React, { useState } from "react";
import { Link } from "react-router-dom";
import R2 from "../lib/img/r2.png";
import { Detail } from "../components";

const Main = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <section>
                {isOpen ? (
                    <div>
                        <div className="curtain" onClick={() => setIsOpen(false)}></div>
                        <Detail />
                    </div>
                ) : null}
            </section>

            <section className="section1">
                <div className="inner">
                    <div className="backImg">
                        <div className="wrap_text">
                            <div className="wrap_text_box">
                                <p className="text1">오늘의 기분은 어떠신가요?</p>
                                <p className="text2">글로써 삶의 길을 살아가요</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section2">
                <div className="inner">
                    <div className="card" onClick={() => setIsOpen(true)}>
                        <div className="card-img">
                            <img src={R2} alt="card-img" />
                        </div>
                        <div className="card-tag">태그</div>
                        <div className="card-title">
                            <p>a</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Main;
