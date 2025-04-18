const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré : http://localhost:${PORT}`);
  console.log(listEndpoints(app));
});
