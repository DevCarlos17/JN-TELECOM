import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "description is requiered"],
    trim: true,
  },
  image: {
    url: String,
    public_id: String
  },
}, { timestamps: true })

export default model("Post", postSchema)