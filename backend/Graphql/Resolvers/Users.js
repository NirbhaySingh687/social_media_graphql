const Users = require("../../Models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { UserInputError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require("../../Utils/validator")

async function generateToken(res){
    return jwt.sign({
        id: res._id,
        email: res.email,
        username: res.username
    }, "superSecretPassword", { expiresIn: "1h"})
}

module.exports = {
    Mutation: {
        async register(_, {
            registerInput: { username, email, password, confirmPassword }
        }, context, info){
            //Todo Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) throw new UserInputError('Errors', { errors });
            // Todo Make sure user doesn't already exists
            const user = await Users.findOne({ username });
            if(user){
                throw new UserInputError('Username is taken',{
                    errors: {
                        username: "This username is taken"
                    }
                })
            }
            // Todo hash password and create an auth token
            password = await bcrypt.hash(password, 12);
            const newUser = new Users({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            const token = await generateToken(res);
            return {
                ...res["_doc"],
                id: res._id,
                token
            }
        },

        async login(_, {
            loginInput: { username, password }
        }){
            const { valid, errors } = validateLoginInput(username, password);
            if(!valid){
                throw new UserInputError('Invalid cred', { errors });
            }
            const users = await Users.findOne({ username });
            if(!users){
                errors.general = 'User not Found';
                throw new UserInputError('User not Found', { errors });
            }

            // Check Password
            const match = await bcrypt.compare(password, users.password);
            if(!match){
                errors.general = 'Wrong Credential';
                throw new UserInputError('Wrong Credential', { errors });
            }
            const token = await generateToken(users);
            return {
                ...users["_doc"],
                id: users._id,
                token
            }
        }
    }
}