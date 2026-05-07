import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: String,
  pricePerHour: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  images: [String],
  specs: { engine: String, mileage: String, fuelType: String, transmission: String },
  isAvailable: { type: Boolean, default: true },
  totalStock: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model('Bike', bikeSchema);
