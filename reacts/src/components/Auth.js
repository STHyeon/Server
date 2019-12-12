import React from "react";
import { Link } from "react-router-dom";

const Auth = props => {
    const Login = () => {
        return (
            <div className="inner">
                <div className="login">
                    <div className="brown">
                        <div className="register_box">
                            <p className="text1">계정이</p>
                            <p className="text1">있으십니까?</p>
                            <p className="text2">글길에 오신 걸 환영합니다.</p>
                            <Link to="/register" className="link">
                                회원가입
                            </Link>
                        </div>
                        <div className="login_contain">
                            <h1>로그인</h1>
                            <div className="login_box">
                                <input type="text" className="login_input" placeholder="아이디" />
                                <input
                                    type="passsword"
                                    className="login_input"
                                    placeholder="비밀번호"
                                />
                                <button className="login_button">로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Register = () => {
        return (
            <div className="inner">
                <div className="register_container">
                    <div className="brown">
                        <div className="input_box">
                            <h1 className="text1">회원가입</h1>
                            <input type="text" className="register_input" placeholder="아이디" />
                            <input
                                type="password"
                                className="register_input"
                                placeholder="비밀번호"
                            />
                            <input
                                type="password1"
                                className="register_input"
                                placeholder="비밀번호 확인"
                            />
                            <button className="register_button">회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return <div>{props.mode ? <Login /> : <Register />}</div>;
};

export default Auth;
