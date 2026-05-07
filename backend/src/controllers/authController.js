import jwt from 'jsonwebtoken';
import admin from '../config/firebase.js';
import User from '../models/User.js';
import { env } from '../config/env.js';

export const otpLogin = async (req, res) => {
  const { idToken, name } = req.validated;
  const decoded = await admin.auth().verifyIdToken(idToken);
  const mobile = decoded.phone_number;
  let user = await User.findOne({ mobile });
  if (!user) user = await User.create({ mobile, name: name || 'Rider' });
  const token = jwt.sign({ id: user._id, role: user.role, mobile: user.mobile }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  res.json({ token, user });
};
