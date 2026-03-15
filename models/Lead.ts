import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email?: string;
  location: string;
  message?: string;
  category: 'commercial' | 'residential' | 'franchise';
  electricityBillUrl?: string;
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
    electricityBillUrl: { type: String },
  },
  { timestamps: true }
);

const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
export default Lead;
