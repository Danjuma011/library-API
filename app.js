// require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const routes = require('./routes/auth');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

mongoose.connect("mongodb+srv://rasheedah:rasheedah@cluster0.pw3swto.mongodb.net/?retryWrites=true&w=majority")
  .then(()=>console.log('connected to mongoDb')).then(() => {
  app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
}).catch(err => console.log('could not connect', err))

