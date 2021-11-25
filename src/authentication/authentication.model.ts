import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  guid: { type: String, required: true },
  id: { type: String },
  name: { type: String },
  password: { type: String },
});

export interface Authentication extends mongoose.Document {
     guid: string,
     id: string,
     name: string,
     password: string,
}
