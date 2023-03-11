// require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const booksRoute = require('./routes/books');
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api', authRoutes);
app.use('/user', userRoutes);
app.use('/api/books', booksRoute);

mongoose.connect("mongodb+srv://rasheedah:rasheedah@cluster0.pw3swto.mongodb.net/?retryWrites=true&w=majority")
  .then(()=>console.log('connected to mongoDb')).then(() => {
  app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
}).catch(err => console.log('could not connect', err))
