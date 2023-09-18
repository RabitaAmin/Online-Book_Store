const express = require("express");
const routes = express();
const auth = require("../middleware/auth")
const validate = require("../middleware/custom_validator");
const cartController = require("../controllers/cartController");
routes.post("/addToCart", auth.auth, cartController.cart);
routes.post("/removeFromCart", auth.auth, cartController.removeItem);
routes.post("/checkout", auth.auth, cartController.checkout);
routes.get("/viewCart", auth.auth, cartController.viewCart);
module.exports = routes;