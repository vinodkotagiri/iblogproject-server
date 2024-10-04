const jwt = require('jsonwebtoken');
const config = require('../config')
class Authentication {
    constructor() {
        this.secret = config.jwtSecret;
        this.expiry = config.jwtExpiresIn ?? '7d';
    }

    async generateToken(payload, options = { expiresIn: this.expiry }) {
        return jwt.sign(payload, this.secret, options);
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async decodeToken(token) {
        return jwt.decode(token);
    }
}

const auth = new Authentication();

module.exports={
    generateToken:auth.generateToken.bind(auth),
    verifyToken:auth.verifyToken.bind(auth),
    decodeToken:auth.decodeToken.bind(auth)
}
