import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug:{
    type: String,
    lowercase: true
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  due_date: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: ObjectId,
    ref: "User",
    required: true
  },
}, {timestamps: true});

export default mongoose.model("Task", taskSchema);
