import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'account already exists with this username'],
    required: true,
  },

  email: {
    type: String,
    unique: [true, 'account already exists with this email address'],
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
