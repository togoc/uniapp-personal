const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Counts = require('./usercount')
const Folder = require('./folder')
const Blog = require('./blog')
const jwt = require('jsonwebtoken')
const env = require('../enviroment/env')
const ObjectID = require('mongodb').ObjectID
  // 用于修改后期数据
// async function foo() {
//   let users = await User.find({})
//   let counts = await Counts.find({})
//   counts.forEach(async(v) => {
//     for (let i = 0; i < users.length; i++) {
//       if (String(v.userid) === String(users[i]._id)) {
//         v.username = users[i].name
//         await v.save()
//       }
//     }
//   })
// }

// setTimeout(() => {
//   foo()
// }, 2000);

const userSchema = mongoose.Schema({
  blog_count: {
    type: Number,
    default: 0
  },

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

  avatar: {
    type: String,
    default: env.fullUrl + "/public/images/default.png"
  },

  identity: {
    type: String,
    default: 'normal'
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

  date: {
    type: Number,
    default: Date.now
  }

})

userSchema.pre('save', async function(next) {

  const user = this;

  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 8)
  }


  // 修改name的时候 同步修改到blog counts
  if (user.isModified('name') && (user.name !== "")) {
    await Folder.updateMany({ userid: ObjectID(user._id) }, { username: user.name })
    await Blog.updateMany({ userid: ObjectID(user._id) }, { username: user.name })
    await Blog.updateMany({ "comments.userid": ObjectID(user._id) }, { $set: { "comments.$[element].username": user.name } }, { arrayFilters: [{ "element.userid": ObjectID(user._id) }] })
    await Counts.updateMany({ userid: ObjectID(user._id) }, { username: user.name })
  }

  // 初始化name
  if (user.isModified('name') && (user.name === "")) {
    user.name = user.email
  }


  next()
})

userSchema.statics.findUser = async(password, email) => {

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("用户不存在(User not found)!")
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("密码错误(Incorrect password)!");
  }

  return user;

}


userSchema.statics.getAvatar = async function(userID) {

  const user = await User.findOne(ObjectID(userID))

  return user.avatar.split('/').pop()
}

userSchema.methods.createToken = async function() {
  const iv = crypto.randomBytes(16);
  const user = this;
  let token = null

  if (user.identity === 'normal') {
    token = jwt.sign({ _id: user._id.toString(), iv }, env.password, { expiresIn: 3600 * 2 });
  } else if (user.identity === 'root') {
    token = jwt.sign({ _id: user._id.toString(), iv }, env.password, { expiresIn: 360000 * 2 });
  }

  //未对token加密
  user.tokens = user.tokens.concat({ token: token });

  await user.save();

  return token
}



userSchema.methods.addCounts = async function() {
  let id = this._id
  let name = this.name
  let newCount = new Counts({
    userid: id,
    username: name
  })

  return await newCount.save()
}


const User = mongoose.model("users", userSchema);

module.exports = User;