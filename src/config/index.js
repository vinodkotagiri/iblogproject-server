module.exports={
    app:require('./app'),
    db:require('./db'),
    port:process.env.PORT,
    dbUrl:process.env.MONGO_URI,
    jwtSecret:process.env.JWT_SECRET,
    jwtExpiresIn:process.env.JWT_EXPIRES_IN
}