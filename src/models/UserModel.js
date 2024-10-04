const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String },
    role: { type: Number, default: 0 }, //0-user 27-admin
    verify: { type: Schema.Types.Mixed, default: undefined },
    status: { type: String, default: 'P' }, //P-pending, A-active, B-blocked
}, { timestamps: true })

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', userSchema)