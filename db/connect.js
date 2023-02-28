const mongoose = require('mongoose');

const uri = 'mongodb+srv://rasheedah:rasheedah@cluster0.pw3swto.mongodb.net/?retryWrites=true&w=majority'; // Replace with your own MongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = db;
