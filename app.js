const express = require("express");
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const databaseConnection = require("./config/database");
const userModel = require("./models/users");
const app = express();
const myRoutes = require("./routes/Auth");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const validateJSON = require("./middleware/auth");
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
//app.use(validateJSON.validateJSON);
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return sendResponse(
            res,
            HTTP_STATUS.UNPROCESSABLE_ENTITY,
            'Invalid JSON provided'
        );
    }
    next();
});
app.use("/auth", myRoutes);
app.use("/book", bookRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);

app.use(myRoutes);
app.use(bookRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(cors({ origin: "*" }));

databaseConnection(() => {
    app.listen(8000, () => {
        console.log(`Server is running on port ${8000}`)
    })
})