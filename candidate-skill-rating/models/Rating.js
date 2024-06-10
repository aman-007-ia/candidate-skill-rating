import mongoose from "mongoose";
import autoIncrement from "@alec016/mongoose-autoincrement";

const ratingSchema = new mongoose.Schema({
  ratingId: {
    type: Number,
    unique: true,
  },
  skillId: {
    type: Number,
    required: true,
  },
  difficulty_level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  candidateId: {
    type: Number,
    required: true,
    ref: "Candidate",
  },
});

// Initialize mongoose-autoincrement
autoIncrement.initialize(mongoose.connection);

// Apply the auto-increment plugin to the ratingId field
ratingSchema.plugin(autoIncrement.plugin, {
  model: "Rating",
  field: "ratingId",
  startAt: 1,
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
