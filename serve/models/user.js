const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const env = require('../enviroment/env')
const userSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('邮箱非法!')
            }
        }
    },


    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('密码长度小于6!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

})

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, 8)
    }
    next()
})

userSchema.statics.findUser = async (password, email) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        console.log("incorrect password")
        throw new Error("Incorrect password");
    }

    return user;

}

userSchema.methods.createToken = async function () {
    const iv = crypto.randomBytes(16);
    const user = this;

    let token = jwt.sign({ _id: user._id.toString(), iv }, env.password);

    //未对token加密
    user.tokens = user.tokens.concat({ token: token });

    await user.save();

    return token
}


const User = mongoose.model("User", userSchema);

module.exports = User;