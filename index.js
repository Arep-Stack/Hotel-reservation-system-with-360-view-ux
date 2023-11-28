const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users/userRoutes');
const serviceRoutes = require('./routes/services/servicesRoutes');
const cors = require('cors');


const app = express();

app.use(cors({
  origin: "*"
}))

// Middleware
app.use(bodyParser.json());

// Use the routes
app.use('/v1', userRoutes);
app.use('/v1', serviceRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
