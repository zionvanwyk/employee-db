require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    console.log("Authorization Header:", req.header("Authorization"));

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        console.log("No Authorization header found");
        return res.status(401).json({message: "No token, authorization denied"});
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token validation error:", error);
        res.status(401).json({message: "Token is not valid"});
    }
}

module.exports = authenticateToken;
