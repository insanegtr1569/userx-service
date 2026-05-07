import Booking from '../models/Booking.js';
import Bike from '../models/Bike.js';

export const createBooking = async (req, res) => {
  const data = req.validated;
  const bike = await Bike.findById(data.bike);
  const totalPrice = data.durationHours >= 24 ? Math.ceil(data.durationHours / 24) * bike.pricePerDay : data.durationHours * bike.pricePerHour;
  res.status(201).json(await Booking.create({ ...data, user: req.user.id, totalPrice }));
};
export const myBookings = async (req, res) => res.json(await Booking.find({ user: req.user.id }).populate('bike').sort({ createdAt: -1 }));
export const listBookings = async (_req, res) => res.json(await Booking.find().populate('user bike').sort({ createdAt: -1 }));
export const updateBookingStatus = async (req, res) => res.json(await Booking.findByIdAndUpdate(req.params.id, req.validated, { new: true }));
