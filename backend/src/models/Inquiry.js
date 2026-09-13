import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    lastName: { type: String, required: true },
    productName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, required: true },
    city: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model("Inquiry", inquirySchema);
