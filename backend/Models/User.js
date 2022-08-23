const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String
}, {
    timestamps: true
})

module.exports = model("users",userSchema)