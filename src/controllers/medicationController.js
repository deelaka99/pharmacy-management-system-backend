const sqlite3 = require("sqlite3").verbose();
const dbPath = "./src/db/db.sqlite3";
const Medication = require("../models/Medication"); // Import the Customer model

// Query existing medications
exports.getAllMedications = (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const query = "SELECT * FROM medication WHERE deleted = 0";
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      // Convert rows to Medication objects
      const medications = rows.map(
        (row) => new Medication(row.name, row.quantity, row.description)
      );
      res.json(medications);
    }
  });
  db.close();
};

// Insert medication
exports.createMedication = (req, res) => {
  const { name, quantity, description } = req.body;
  const db = new sqlite3.Database(dbPath);
  const query =
    "INSERT INTO medication (name, quantity, description, deleted) VALUES (?, ?, ?, 0)";
  db.run(query, [name, quantity, description], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      const newMedication = new Medication(name, quantity, description);
      newMedication.id = this.lastID;
      res.status(201).json(newMedication);
    }
  });
  db.close();
};

// Update medication details
exports.updateMedication = (req, res) => {
  const medicationId = req.params.id;
  const { name, quantity, description } = req.body;
  const db = new sqlite3.Database(dbPath);
  const query =
    "UPDATE medication SET name = ?, quantity = ?, description = ? WHERE id = ?";
  db.run(query, [name, quantity, description, medicationId], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      res.json({ id: medicationId, name, quantity, description });
    }
  });
  db.close();
};

// Soft delete medication record
exports.softDeleteMedication = (req, res) => {
  const medicationId = req.params.id;
  const db = new sqlite3.Database(dbPath);
  const query = "UPDATE medication SET deleted = 1 WHERE id = ?";
  db.run(query, [medicationId], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      res.json({ id: medicationId, message: "Medication soft deleted" });
    }
  });
  db.close();
};

// Delete medication record
exports.deleteMedication = (req, res) => {
  const medicationId = req.params.id;
  const db = new sqlite3.Database(dbPath);
  const query = "DELETE FROM medication WHERE id = ?";
  db.run(query, [medicationId], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      res.json({ message: "Customer deleted successfully" });
    }
  });
  db.close();
};
