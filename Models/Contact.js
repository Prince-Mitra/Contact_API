import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId }, //store the ID of another MongoDB document here.
  //This model creates a User collection, and MongoDB will automatically give each user an _id.
  //That _id is what you store here in another schema:
  //This document belongs to this User”
});
export const Contact = mongoose.model("contact", contactSchema);
