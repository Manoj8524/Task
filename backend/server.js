const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');
const headerRoutes = require('./routes/headerRoutes');
const linksRoutes = require('./routes/links');
const footerRoutes = require('./routes/footerRoutes');
const contentRoutes = require('./routes/HomecontentRoutes');
const aboutRoutes = require("./routes/about.routes");
const contactRoutes = require("./routes/contactRoutes");
const serviceRoutes = require("./routes/service");
const adRoutes = require('./routes/adRoutes');

dotenv.config();

const app = express();
connectDB();


const allowedOrigins = [
  'http://localhost:3000',  
  'http://localhost:3001',
  'https://task-ss1p.vercel.app',
  'https://task-dynamic.vercel.app',
  'http://example4.com'
];


app.use(cors({
  origin: function(origin, callback) {
   
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/header', headerRoutes);
app.use('/ads', adRoutes);
app.use("/api/about", aboutRoutes);
app.use('/api/links', linksRoutes);
app.use('/api', footerRoutes);
app.use('/api/content', contentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
