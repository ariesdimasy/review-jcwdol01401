"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// localhost:5670/test/lagi/again?search=dimas&foo=bar
router.get("/users", (req, res, next) => {
    console.log("check access");
    const getAccess = true;
    if (getAccess) {
        console.log("bisa mengakses data users");
        next();
    }
    else {
        res.status(404).send({
            message: "error"
        });
    }
}, (req, res, next) => {
    console.log("middleware selanjutnya ");
    next();
}, auth_controller_1.getAllUsers);
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
exports.default = router;
