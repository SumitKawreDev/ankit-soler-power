import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  capacity: string;
  category: 'commercial' | 'residential';
  images: string[];
  youtubeUrl?: string;
  state: string;
  district: string;
  googleMapsUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    capacity: { type: String, required: true },
    category: { type: String, enum: ['commercial', 'residential'], required: true },
    images: [{ type: String }],
    youtubeUrl: { type: String },
    state: { type: String, required: true },
    district: { type: String, required: true },
    googleMapsUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
