require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const booksRoute = require('./routes/books');
const authMiddleware = require('./middleware/auth')
const PORT = process.env.PORT || 8000;
const cors = require('cors');


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user',authMiddleware, userRoutes);
app.use('/api/books',authMiddleware, booksRoute);
app.use(cors());

mongoose.connect(process.env.DBSTRING)
  .then(()=>console.log('connected to mongoDb')).then(() => {
  app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
}).catch(err => console.log('could not connect', err))
