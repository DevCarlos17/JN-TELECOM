import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  rol: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
  },
  canSeeContact: {
    type: Boolean
  }

},
  { timestamps: true })

//Methods

//password encryption
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt)
}

//Validate password
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}


export default mongoose.model("User", userSchema)