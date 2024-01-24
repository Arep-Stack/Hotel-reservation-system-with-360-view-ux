const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users/userRoutes');
const serviceRoutes = require('./routes/services/servicesRoutes');
const imageRoutes  = require('./routes/utils/ImageRoutes');
const reservationRoutes  = require('./routes/reservations/reservationsRoutes');
const paymentRoutes  = require('./routes/payment/paymentRoutes');
const paypalRoutes  = require('./routes/utils/paypalRoutes');
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
app.use('/v1', imageRoutes);
app.use('/v1', reservationRoutes);
app.use('/v1', paymentRoutes);
app.use('/v1', paypalRoutes);

const PORT = process.env.PORT || 3002;

// Paypal


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
