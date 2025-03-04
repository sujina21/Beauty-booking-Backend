const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, refPath: "serviceType", required: true },
  serviceType: { type: String, enum: ["Makeup", "Nail"], required: true },
  bookingDate: { type: String, required: true },
  bookingTime: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Booking Pending" },
});

module.exports = mongoose.model("Booking", BookingSchema);
