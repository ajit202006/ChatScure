import { RequestHandler } from "express";

const signup: RequestHandler = (req, res) => {
    res.send("signup");
}
const login: RequestHandler = (req, res) => {
    res.send("login");
}
const logout: RequestHandler = (req, res) => {
    res.send("logout");
}

export { signup, logout, login };