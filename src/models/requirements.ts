import mongoose from "mongoose";

const RequirementsFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  city: { type: String, required: true },
  projectArea: { type: String, required: true },
  budget: { type: String, required: true },
  requirements: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RequirementsForm =
  mongoose.models.RequirementsForm ||
  mongoose.model("RequirementsForm", RequirementsFormSchema);

export default RequirementsForm;
