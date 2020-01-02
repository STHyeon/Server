import React, { useState } from "react";
import { Link } from "react-router-dom";

const Auth = props => {
    const Login = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const handleLogin = () => {
            props.onLogin({ username, password });
        };
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
                                <input
                                    type="text"
                                    className="login_input"
                                    name="username"
                                    placeholder="아이디"
                                    value={username}
                                    onChange={({ target: { value } }) => setUsername(value)}
                                />

                                <input
                                    type="password"
                                    className="login_input"
                                    name="password"
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={({ target: { value } }) => setPassword(value)}
                                />
                                <button className="login_button" onClick={handleLogin}>
                                    로그인
                                </button>
                                {props.authError ? (
                                    <p className="authError">{props.authError}</p>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Register = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [password2, setPassword2] = useState("");
        const handleRegister = e => {
            e.preventDefault();
            props.onRegister({ username, password, password2 });
        };
        return (
            <div className="inner">
                <div className="register_container">
                    <div className="brown">
                        <div className="input_box">
                            <h1 className="text1">회원가입</h1>
                            <input
                                type="text"
                                className="register_input"
                                placeholder="아이디"
                                onChange={({ target: { value } }) => setUsername(value)}
                            />
                            <input
                                type="password"
                                className="register_input"
                                placeholder="비밀번호"
                                onChange={({ target: { value } }) => setPassword(value)}
                            />
                            <input
                                type="password"
                                className="register_input"
                                placeholder="비밀번호 확인"
                                onChange={({ target: { value } }) => setPassword2(value)}
                            />
                            <button
                                type="submit"
                                className="register_button"
                                onClick={handleRegister}
                            >
                                회원가입
                            </button>
                            {props.authError ? <p className="authError">{props.authError}</p> : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return <div>{props.mode ? <Login /> : <Register />}</div>;
};

export default Auth;
