import crypto from 'crypto';
import { razorpay } from '../config/razorpay.js';
import { env } from '../config/env.js';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

export const createOrder = async (req, res) => {
  const booking = await Booking.findById(req.validated.bookingId);
  const order = await razorpay.orders.create({ amount: booking.totalPrice * 100, currency: 'INR', receipt: String(booking._id) });
  const payment = await Payment.create({ booking: booking._id, amount: booking.totalPrice, razorpayOrderId: order.id });
  res.json({ order, payment });
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.validated;
  const expected = crypto.createHmac('sha256', env.razorpaySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
  const ok = expected === razorpay_signature;
  const payment = await Payment.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: ok ? 'captured' : 'failed' }, { new: true });
  await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: ok ? 'paid' : 'failed' });
  res.json({ success: ok });
};
