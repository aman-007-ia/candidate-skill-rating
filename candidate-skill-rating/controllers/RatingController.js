// controllers/ratingController.js

import Rating from "../models/Rating.js";
import Candidate from "../models/Candidate.js";
import User from "../models/User.js";
import getWeight from "../utils/getWeight.js";

class RatingController {
  // Create a new rating
  static async createRating(req, res) {
    try {
      const {
        candidateId,
        skillId,
        difficulty_level,
        question,
        rating,
        response,
      } = req.body;
      const userId = req.user.id;

      // Verify the candidate exists
      const candidate = await Candidate.findOne({ candidateId });
      if (!candidate) {
        return res.status(400).json({
          errors: {
            candidateId:
              "Candidate not found. Please create the candidate first.",
          },
        });
      }

      // Verify the candidate exists
      const reviewer = await User.findById(userId);
      if (!reviewer || reviewer.role !== "reviewer") {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform this action" });
      }

      // Create the new rating
      const newRating = await Rating.create({
        candidateId,
        skillId,
        difficulty_level,
        question,
        rating,
        response,
      });

      res.status(201).json(newRating);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Retrieve all ratings
  static async getAllRating(req, res) {
    try {
      const rating = await Rating.find();
      res.status(200).json(rating);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Retrieve a rating by ID
  static async getRatingById(req, res) {
    try {
      const rating = await Rating.findById(req.params.id);
      if (rating) {
        res.status(200).json(rating);
      } else {
        res.status(404).json({ message: "Rating not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a rating by ID
  static async updateRatingById(req, res) {
    try {
      const updatedCandidate = await Rating.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (updatedCandidate) {
        res.status(200).json(updatedCandidate);
      } else {
        res.status(404).json({ message: "Rating not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a rating by ID
  static async deleteRatingById(req, res) {
    try {
      const deletedCandidate = await Rating.findByIdAndDelete(req.params.id);
      if (deletedCandidate) {
        res.status(200).json({ message: "Rating deleted successfully" });
      } else {
        res.status(404).json({ message: "Rating not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAggregatedSkills(req, res) {
    try {
      const { skillId } = req.body;

      // Fetch all ratings for the candidate
      const ratings = await Rating.find({ skillId });

      // Group by skillId and calculate weighted average
      const skillRatings = {};

      ratings.forEach(({ skillId, difficulty_level, rating }) => {
        if (!skillRatings[skillId]) {
          skillRatings[skillId] = { totalScore: 0, totalWeight: 0 };
        }

        const weight = getWeight(difficulty_level);
        skillRatings[skillId].totalScore += weight * rating;
        skillRatings[skillId].totalWeight += weight;
      });

      // Calculate aggregated ratings
      const aggregatedRatings = Object.entries(skillRatings).map(
        ([skillId, { totalScore, totalWeight }]) => ({
          skillId: parseInt(skillId, 10),
          rating: totalScore / totalWeight,
        })
      );

      res.status(200).json(aggregatedRatings);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default RatingController;
