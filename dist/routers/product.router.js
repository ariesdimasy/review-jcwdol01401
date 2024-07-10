"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const router = (0, express_1.Router)();
router.post("/", jwt_middleware_1.verifyToken, jwt_middleware_1.adminGuard, product_controller_1.createProduct);
router.get("/", product_controller_1.getAllProducts);
router.get("/", (req, res) => {
    res.send({
        message: "success",
        data: "hello world"
    });
});
exports.default = router;
