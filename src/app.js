const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use("/auth", require("./routes/auth.routes"));

app.get("/", (req, res) => {
    res.send("Auth Service is running");
});

module.exports = app;