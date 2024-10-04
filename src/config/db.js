function connectDB(MONGO_URI, logger) {
    return new Promise((resolve, reject) => {
        const mongoose = require('mongoose');
        mongoose.connect(MONGO_URI).then((conn) => {
            resolve(conn);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = connectDB;