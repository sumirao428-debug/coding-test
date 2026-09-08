import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILead extends Document {
  email: string
  answers: string[]
  result: string
  resultType: string
  createdAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    answers: { type: [String], default: [] },
    result: { type: String, default: '' },
    resultType: { type: String, default: '' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>('Lead', LeadSchema)

export default Lead
