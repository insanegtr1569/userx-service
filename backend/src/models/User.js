import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  mobile: { type: String, required: true, unique: true, index: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  documents: {
    drivingLicenseUrl: String,
    aadhaarUrl: String
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
