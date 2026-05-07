import Bike from '../models/Bike.js';

export const listBikes = async (req, res) => {
  const { q, available } = req.query;
  const filter = {};
  if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { brand: new RegExp(q, 'i') }];
  if (available === 'true') filter.isAvailable = true;
  res.json(await Bike.find(filter).sort({ createdAt: -1 }));
};
export const getBike = async (req, res) => res.json(await Bike.findById(req.params.id));
export const createBike = async (req, res) => res.status(201).json(await Bike.create(req.validated));
export const updateBike = async (req, res) => res.json(await Bike.findByIdAndUpdate(req.params.id, req.validated, { new: true }));
export const deleteBike = async (req, res) => { await Bike.findByIdAndDelete(req.params.id); res.status(204).send(); };
