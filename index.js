const express = require('express');
const app = express();
const cors = require('cors');

// Import Routes
const userRoutes = require('./routers/userRouter');

// Middleware
app.use(express.json()); // for parsing JSON
app.use(cors())
// Use Routes
app.use('/', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
