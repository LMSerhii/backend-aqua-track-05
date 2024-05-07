import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN, JWT_EXPIRES_IN_TEMP } = process.env;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    token: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      required: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// eslint-disable-next-line func-names
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

// eslint-disable-next-line func-names
userSchema.methods.createAvatar = function () {
  const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

  this.avatar = `https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
};

// eslint-disable-next-line func-names
userSchema.methods.createToken = function () {
  this.token = jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// eslint-disable-next-line func-names
userSchema.methods.createTempToken = function () {
  this.token = jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN_TEMP,
  });
};

// eslint-disable-next-line func-names
userSchema.methods.createVerificationToken = function () {
  this.verificationToken = nanoid();
};

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = async function (password) {
  const isCompare = await bcrypt.compare(password, this.password);

  return isCompare;
};

export const User = model("user", userSchema);
