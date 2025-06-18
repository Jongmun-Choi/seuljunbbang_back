const jwt = require("jsonwebtoken");
const util = require("util");

const signAsync = util.promisify(jwt.sign);
const privateKey = process.env.JWT_KEY;

async function generateToken(payload) {
    return await signAsync(payload, privateKey);
}

module.exports = generateToken;