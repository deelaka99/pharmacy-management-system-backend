const express = require('express');
require('dotenv').config()
const authRoutes = require('./src/routes/auth');
const medicationRoutes = require('./src/routes/medication');
const customerRoutes = require('./src/routes/customer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/medication', medicationRoutes);
app.use('/customer', customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
