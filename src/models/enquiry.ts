// app/models/enquiry.ts
import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["interior", "construction", "development"],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  area: { type: Number, required: true },
  location: { type: String, required: true },
  budget: {
    type: String,
    enum: ["classic", "premium", "luxury"],
    required: true,
  },
  interiorTypes: [{ type: String }], // Only for interior enquiries
  constructionType: { type: String }, // Only for construction enquiries
  developmentType: { type: String }, // Only for development enquiries
  advance: { type: Number }, // Only for development enquiries
  ration: { type: String }, // Only for development enquiries
  createdAt: { type: Date, default: Date.now },
});

const Enquiry =
  mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
export default Enquiry;
