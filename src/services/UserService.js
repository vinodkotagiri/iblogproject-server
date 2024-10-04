const UserModel = require('../models/UserModel')
const Logger = require('../utils/Logger')
class UserService {
    constructor(UserModel) {
        this.userModel = UserModel
        this.logger = new Logger()
    }

    async createUser(user) {
        try {
            const newUser = await this.userModel.create(user)
            return newUser
        } catch (err) {
            this.logger.error('Error creating user', err)
            throw err
        }
    }
    async updateUser(user) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(user._id, user, { new: true })
            return updatedUser
        } catch (err) {
            this.logger.error('Error updating user', err)
            throw err
        }
    }
    async deleteUser(user) {
        try {
            const deleteUser = await this.userModel.findByIdAndRemove(user._id)
            return deleteUser
        } catch (err) {
            this.logger.error('Error deleting user', err)
            throw err
        }
    }
    async getUser(user) {
        try {
            const foundUser = await this.userModel.findById(user._id)
            return foundUser
        } catch (err) {
            this.logger.error('Error finding user', err)
            throw err
        }
    }
    async getUsers(skip, limit, search, sort) {
        try {
            const query = { $or: [{ email: { $regex: search, $options: 'i' } }, { firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }] }
            const users = await this.userModel.find(query).skip(skip).limit(limit).sort(sort)
            return users
        } catch (err) {
            this.logger.error('Error finding users', err)
            throw err
        }
    }

    async getUserByEmail(email) {
        try {
            const foundUser = await this.userModel.findOne({ email })
            return foundUser
        } catch (err) {
            this.logger.error('Error finding user by email', err)
            throw err
        }
    }
    
    async checkEmailExists(email) {
        try {
            const count = await this.userModel.countDocuments({ email })
            return count > 0
        } catch (err) {
            this.logger.error('Error checking if email exists', err)
            throw err
        }
    }

}
module.exports = {
    createUser: UserService.createUser.bind(UserService),
    updateUser: UserService.updateUser.bind(UserService),
    deleteUser: UserService.deleteUser.bind(UserService),
    getUser: UserService.getUser.bind(UserService),
    getUsers: UserService.getUsers.bind(UserService)
}
