import axios from "axios";

const base = axios.create({
    baseURL: "http://localhost:8080"
});

export const apiRegister = () => {
    return base.post("/auth/register");
};

export const apiLogin = param => {
    return base.post("/auth/login", { param });
};
