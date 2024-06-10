// controllers/ratingController.js

import Candidate from "../models/Candidate.js";

class CandidateController {
  // Create a new rating
  static async createCandidate(req, res) {
    try {
      const newCandidate = await Candidate.create(req.body);
      res.status(201).json(newCandidate);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Retrieve all ratings
  static async getAllCandidate(req, res) {
    try {
      const candidates = await Candidate.find();
      res.status(200).json(candidates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Retrieve a rating by ID
  static async getCandidateById(req, res) {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (candidate) {
        res.status(200).json(candidate);
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a rating by ID
  static async updateCandidateById(req, res) {
    try {
      const updatedCandidate = await Candidate.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (updatedCandidate) {
        res.status(200).json(updatedCandidate);
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a rating by ID
  static async deleteCandidateById(req, res) {
    try {
      const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
      if (deletedCandidate) {
        res.status(200).json({ message: "Data deleted successfully" });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default CandidateController;
