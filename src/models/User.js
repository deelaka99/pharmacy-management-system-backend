const bcrypt = require("bcryptjs");

class User {
  constructor(username, password, role) {
    this.username = username;
    this.password = bcrypt.hashSync(password, 10);
    this.role = role;
  }

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
