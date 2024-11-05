import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {
 return jwt.sign(
  { id: user.id, email: user.email, isSuperAdmin: user.isSuperAdmin },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
 );
};

export const verifyToken = (token) => {
 return jwt.verify(token, process.env.JWT_SECRET);
};
