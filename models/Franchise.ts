import mongoose, { Document, Schema } from 'mongoose';

export interface IFranchise extends Document {
  name: string;
  state: string;
  district: string;
  googleMapsUrl?: string;
  contactNumber: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FranchiseSchema = new Schema<IFranchise>(
  {
    name: { type: String, required: true, trim: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    googleMapsUrl: { type: String },
    contactNumber: { type: String, required: true },
    photoUrl: { type: String },
  },
  { timestamps: true }
);

const Franchise =
  mongoose.models.Franchise || mongoose.model<IFranchise>('Franchise', FranchiseSchema);
export default Franchise;
