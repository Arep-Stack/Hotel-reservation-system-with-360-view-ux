const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users/userRoutes');
const cors = require('cors');
const authRoutes = require('./routes/utils/authRoutes');

const app = express();

app.use(cors({
  origin: "*"
}))

// Middleware
app.use(bodyParser.json());

// Use the routes
app.use('/v1', userRoutes);
app.use('/v1', authRoutes);

const PORT = process.env.PORT || 3002;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
