import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Common";
import { Detail, Form } from "../components";

const Main = ({ data, onList, onPost, username, onDelete, onModify }) => {
    const { writeToggle, setIsOpen, detailToggle, setDetailToggle, setWriteToggle, setSideToggle, setSideIconToggle, side_menu_icon_toggle, side_menu_toggle, formMode, setFormMode } = useContext(
        Context
    );

    useEffect(() => {
        onList();
    }, []);

    const [detailData, setDetailData] = useState([]);
    const Card = props => {
        return (
            <div
                className="card"
                onClick={() => {
                    setIsOpen(true);
                    setDetailToggle(true);
                    setFormMode(true);
                    setDetailData(props);
                }}
            >
                <span>
                    <span>
                        <div className="card-img">
                            <img src={props.dataList.img} alt="card-img" />
                        </div>
                        <div className="card-tag">태그</div>
                        <div className="card-title">
                            <p>{props.dataList.title}</p>
                        </div>
                    </span>
                </span>
            </div>
        );
    };
    let cardMap;

    if (data) {
        cardMap = data.map((list, index) => <Card key={index} dataList={list} />);
    }

    const sideToggle = () => {
        if (!side_menu_icon_toggle) {
            setSideToggle(!side_menu_toggle);
            setSideIconToggle(!side_menu_icon_toggle);
        }
    };

    return (
        <div onClick={sideToggle}>
            {detailToggle ? (
                formMode ? (
                    <Detail data={detailData} onDelete={onDelete} setDetailToggle={setDetailToggle} setIsOpen={setIsOpen} setFormMode={setFormMode} setWriteToggle={setWriteToggle} />
                ) : null
            ) : null}

            {writeToggle ? <Form onPost={onPost} setWriteToggle={setWriteToggle} setIsOpen={setIsOpen} username={username} formMode={formMode} setFormMode={setFormMode} data={detailData} onModify={onModify} setDetailToggle={setDetailToggle} /> : null}
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
