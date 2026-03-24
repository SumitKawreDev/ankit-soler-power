import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email?: string;
  location: string;
  message?: string;
  category: 'commercial' | 'residential' | 'franchise';
  electricityBillPath?: string; // Legacy field - kept for backward compatibility
  billImage?: string;           // Cloudinary URL field
  companyName?: string;
  occupation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    message: { type: String },
    category: { type: String, enum: ['commercial', 'residential', 'franchise'], required: true },
    electricityBillPath: { type: String }, // Legacy field
    billImage: { type: String },           // Cloudinary URL field
    companyName: { type: String, trim: true },
    occupation: { type: String, trim: true },
  },
  { timestamps: true }
);

const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
export default Lead;
