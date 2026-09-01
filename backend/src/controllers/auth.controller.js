import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import BlacklistToken from '../models/blacklist.model.js';

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'please provide username, email and password',
    });
  }

  const isUserAlreadyExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: 'account already exists with this email address or username',
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );

  res.cookie('token', token);

  res.status(201).json({
    message: 'user registered successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: 'invalid email or password',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'invalid email or password',
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );

  res.cookie('token', token);

  res.status(200).json({
    message: 'user logged in successfully.',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (token) {
    await BlacklistToken.create({ token });
  }

  res.clearCookie('token');

  res.status(200).json({
    message: 'user logged out successfully',
  });
}

async function getMe(req, res) {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    message: 'user details fetched successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export { registerUser, loginUser, logoutUser, getMe };
