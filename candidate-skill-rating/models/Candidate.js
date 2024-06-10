import mongoose from "mongoose";
import autoIncrement from "@alec016/mongoose-autoincrement";

const candidateSchema = new mongoose.Schema({
  candidateId: {
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
});

// Initialize mongoose-autoincrement
autoIncrement.initialize(mongoose.connection);

// Apply the auto-increment plugin to the candidateId field
candidateSchema.plugin(autoIncrement.plugin, {
  model: "Candidate",
  field: "candidateId",
  startAt: 1,
});

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
