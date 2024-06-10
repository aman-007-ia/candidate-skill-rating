// controllers/userController.js
import User from "../models/User.js";
import { generateToken } from "../utils/gerenateToken.js";
import bcrypt from "bcryptjs";

class userController {
  static async createUser(req, res) {
    try {
      const { name, role, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      user = new User({ name, role, email, password: hashedPassword });
      user.save();

      return res.json({ message: "Account created successfully!", user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the hashed password with the provided password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token for authentication
      const token = generateToken(user);

      return res.json({
        message: "Logged in successfully",
        access_token: `Bearer ${token}`,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default userController;
