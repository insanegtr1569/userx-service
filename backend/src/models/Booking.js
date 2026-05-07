import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  pickupDate: Date,
  returnDate: Date,
  durationHours: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'active', 'completed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
