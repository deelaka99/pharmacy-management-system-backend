const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3").verbose(); // Import sqlite3 library

const jwtSecret = process.env.JWT_SECRET;
const dbPath = "./src/db/db.sqlite3"; // Path to your SQLite database file

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    jwtSecret,
    { expiresIn: "1h" }
  );
};

const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Open database connection
      const db = new sqlite3.Database(dbPath);

      // Query database for user
      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, row) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server Error" });
          }

          // Close database connection
          db.close();

          if (!row) {
            return res.status(404).json({ message: "User not found" });
          }

          // Check password
          if (!bcrypt.compareSync(password, row.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
          }

          // Generate JWT token
          const token = generateToken(row);

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  async register(req, res) {
    try {
      const { username, password, role } = req.body;

      // Check if the user is the owner
      if (req.user.role !== "owner") {
        return res
          .status(403)
          .json({ message: "Only the owner can register new users" });
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Open database connection
      const db = new sqlite3.Database(dbPath);

      // Insert user into database
      db.run(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, hashedPassword, role],
        function (err) {
          // Close database connection
          db.close();

          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server Error" });
          }

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = authController;
