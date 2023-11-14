const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users/userRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "*"
}))

// Middleware
app.use(bodyParser.json());

// Use the routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
