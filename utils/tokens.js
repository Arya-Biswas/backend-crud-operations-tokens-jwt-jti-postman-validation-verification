const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const secret_key = "Arya@2001";

const generate_token = (Student) => {
    const jti = uuidv4();
    const payload = {
        _id: Student._id,
        role: "user", 
        jti: jti 
    };
    const options = {
        expiresIn: '20m' 
    };
    const token = jwt.sign(payload, secret_key, options);
    return token;
}

module.exports = { generate_token };
