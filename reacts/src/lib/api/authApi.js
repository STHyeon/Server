import axios from "axios";

const base = axios.create({
    baseURL: "http://localhost:8080"
});

export const apiRegister = param => {
    return base.post("/auth/register", { param });
};

export const apiLogin = param => {
    return base.post("/auth/login", { param });
};
