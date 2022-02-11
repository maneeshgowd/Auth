const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name!"],
    minlength: [5, "A user name must be atleast 5 characters long!"],
    maxlength: [30, "A user name cannot exceed more than 30 characters long!"],
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },

      message: "Please enter a valid email!",
    },

    required: [true, "A user must have an email address!"],
    lowercase: true,
  },

  password: {
    type: String,
    trim: true,
    required: [true, "A user must have a password!"],
    minlength: [8, "A password must be atleast 8 characters long!"],
    maxlength: [15, "A password cannot exceed more than 15 characters!"],
  },

  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, "A user must have a repeat password!"],
    minlength: [8, "A password must be atleast 8 characters long!"],
    maxlength: [15, "A password cannot exceed more than 15 characters!"],

    validate: {
      validator: function (passwordConfirm) {
        return this.password === passwordConfirm;
      },

      message: "Password dosen't match!",
    },
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  photo: {
    type: String,
    default: "default.jpg",
  },

  passwordChangedAt: {
    type: Date,
    select: false,
  },

  passwordResetToken: String,
  passwordResetExpires: Date,

  country: {
    type: String,
    trim: true,
    default: "India",
  },

  gender: {
    type: String,
    trim: true,
    enum: ["male", "female", "other"],
    default: "male",
  },

  dob: {
    type: Date,
    required: [true, "A user should have a dob!"],
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// hashing password
// when user enters password the password will be hashed and then stroed in db

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// when user reset password, the reset date will be stored in db

schema.pre("save", function (next) {
  // if the password is ! modified or if the doc is new
  if (!this.isModified("password") || this.isNew) return next();
  // sometimes token will be created before the passwordChangedAt  has been created so we need to fix this by subtratic 1s
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// compare given pass and db pass to change new pass

schema.methods.validateUserPassword = async function (givenPassword, existingPassword) {
  return await bcrypt.compare(givenPassword, existingPassword);
};

// check password changed time

schema.methods.changedPasswordAfter = function (JWT_TIMESTAMP) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWT_TIMESTAMP < changedTimeStamp;
  }

  return false;
};

// creates a reset token to reset password

schema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + 5 * 60 * 1000;

  return resetToken;
};

const Model = mongoose.model("Users", schema);

module.exports = Model;
