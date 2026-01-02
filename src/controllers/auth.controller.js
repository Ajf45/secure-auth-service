const bcrypt = require("bcryptjs");
const {v4 : uuidv4} = require("uuid");
const pool = require("../config/db");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { generateOTP } = require("../utils/otp");
const log = require("../utils/logger");
const { error } = require("node:console");


exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Signup request received for email:", email);

        const hashed = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING email",
            [uuidv4(), email, hashed]
        );
        await log("SIGNUP", email);

        res.json({ message: "User registered", user: result.rows[0] });

    
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ error: "Signup failed", details: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = (await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    )).rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) 
        return res.status(401).json({ message: "Invalid credentials" });

    const otp = generateOTP();
    await pool.query("UPDATE users SET otp = $1 WHERE email = $2", [otp, email]);
    
    console.log("OTP (Demo):", otp); // In production, send this via email/SMS
    res.json({ message: "OTP sent" });
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const user = (await pool.query(
        "SELECT * FROM users WHERE email = $1 AND otp = $2",
        [email, otp]
    )).rows[0];

    if (!user) return res.status(401).json({ error: "Invalid OTP" });

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    await pool.query("UPDATE users SET refresh_token = $1, otp = NULL WHERE id = $2", [refreshToken, user.id]);

    await log("LOGIN", email);

    res.json({ accessToken, refreshToken });
};