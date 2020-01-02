import axios from "axios";

const base = axios.create({
    baseURL: "http://localhost:8080"
});

export const apiRegister = param => {
    return base.post("/auth/register", param);
};

export const apiLogin = param => {
    return base.post("/auth/login", param);
};

export const apiList = () => {
    return base.get("/post/list");
};

export const apiPost = param => {
    return base.post("/post/post", param);
};

export const apiTest = param => {
    // return base.post("/test/upload", { param });
    return "http://localhost:8080/test/upload";
};

export const apiImage = param => {
    return base.post("/post/img", param);
};
