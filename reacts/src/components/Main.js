import React, { useState, useEffect } from "react";
import { Detail } from "../components";
import R2 from "../lib/img/r2.png";

const Main = ({ data, onList }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [detailData, setDetailData] = useState([]);
    const Card = props => {
        return (
            <div
                className="card"
                onClick={() => {
                    setIsOpen(true);
                    setDetailData(props);
                }}
            >
                <div className="card-img">
                    <img src={R2} alt="card-img" />
                </div>
                <div className="card-tag">태그</div>
                <div className="card-title">
                    <p>{props.dataList.title}</p>
                </div>
            </div>
        );
    };

    const cardMap = data.map((list, index) => <Card key={index} dataList={list} />);
    useEffect(() => {
        setInterval(() => {
            onList();
        }, 5000);
    }, [data]);

    return (
        <div>
            {isOpen ? (
                <div>
                    <div className="curtain" onClick={() => setIsOpen(false)}></div>
                    <Detail data={detailData} />
                </div>
            ) : null}
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
                <div className="inner">{cardMap}</div>
            </section>
        </div>
    );
};

export default Main;
