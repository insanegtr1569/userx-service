import User from '../models/User.js';
export const me = async (req, res) => res.json(await User.findById(req.user.id));
export const listUsers = async (_req, res) => res.json(await User.find().sort({ createdAt: -1 }));
