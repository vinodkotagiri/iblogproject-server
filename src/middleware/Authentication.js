const AuthUtil = require('../utils/Autentication');
class Authentication {
    async authenticate(req, res, next) {
        try {
            const token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            const decoded = await AuthUtil.decodeToken(token);
            if (!decoded) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            req.userId = decoded.id;
            next();
        } catch (error) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
    }
}

const auth=new Authentication();
modeule.exports={
    authenticate:auth.authenticate.bind(auth)
}