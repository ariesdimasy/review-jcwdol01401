"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    return res.status(200).send({
        "jwt_key": process.env.JWT_SECRET_KEY,
        base_url: process.env.BASE_URL
    });
});
exports.default = router;
