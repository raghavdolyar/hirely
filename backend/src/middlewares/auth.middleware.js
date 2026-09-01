import jwt from 'jsonwebtoken';
import BlacklistToken from '../models/blacklist.model.js';

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'token not provided',
    });
  }

  const isTokenBlacklisted = await BlacklistToken.findOne({ token });

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: 'invalid token',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'invalid token',
    });
  }
}

export { authUser };
