const sqlite3 = require("sqlite3").verbose();
const dbPath = "./src/db/db.sqlite3";
const Customer = require("../models/Customer"); // Import the Customer model

// Query existing customers
exports.getAllCustomers = (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const query = "SELECT * FROM customer WHERE deleted = 0";
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      // Convert rows to Customer objects
      const customers = rows.map(
        (row) => new Customer(row.name, row.age, row.address)
      );
      res.json(customers);
    }
  });
  db.close();
};

// Insert customer
exports.createCustomer = (req, res) => {
  const { name, age, address } = req.body;
  const db = new sqlite3.Database(dbPath);
  const query =
    "INSERT INTO customer (name, age, address, deleted) VALUES (?, ?, ?, 0)";
  db.run(query, [name, age, address], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      const newCustomer = new Customer(name, age, address);
      newCustomer.id = this.lastID;
      res.status(201).json(newCustomer);
    }
  });
  db.close();
};

// Update customer details
exports.updateCustomer = (req, res) => {
  const customerId = req.params.id;
  const { name, age, address } = req.body;
  const db = new sqlite3.Database(dbPath);
  const query =
    "UPDATE customer SET name = ?, age = ?, address = ? WHERE id = ?";
  db.run(query, [name, age, address, customerId], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      res.json({ id: customerId, name, age, address });
    }
  });
  db.close();
};

// Soft delete customer record
exports.softDeleteCustomer = (req, res) => {
  const customerId = req.params.id;
  const db = new sqlite3.Database(dbPath);
  const query = "UPDATE customer SET deleted = 1 WHERE id = ?";
  db.run(query, [customerId], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      res.json({ id: customerId, message: "Customer soft deleted" });
    }
  });
  db.close();
};

// Delete customer record
exports.deleteCustomer = (req, res) => {
  const customerId = req.params.id;
  const db = new sqlite3.Database(dbPath);
  const query = "DELETE FROM customer WHERE id = ?";
  db.run(query, [customerId], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    } else {
      res.json({ message: "Customer deleted successfully" });
    }
  });
  db.close();
};
