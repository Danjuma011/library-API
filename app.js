const express = require('express');
const app = express();
const db = require('./db/connect');
const routes = require('./routes/library');

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
