const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://finpath.vercel.app',
    'https://finpath-git-main-anglerfishlyy.vercel.app',
    'https://finpath-anglerfishlyy.vercel.app',
    'https://finpath-gzniboeh6-kavyas-projects-0470dcc1.vercel.app'  // Add your actual Vercel domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Add preflight handling
app.options('*', cors());

// Middleware
app.use(express.json());

// Only log in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    if (req.body) console.log('Request body:', req.body);
    next();
  });
}

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/budgets', require('./routes/budgets'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/investments', require('./routes/investments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
    app.listen(process.env.PORT || 10000, () => {
      console.log(`Server running on port ${process.env.PORT || 10000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// After mongoose.connect()
mongoose.connection.on('connected', () => {
  console.log('Connected to database:', mongoose.connection.db.databaseName);
  console.log('Available collections:', 
    mongoose.connection.db.listCollections().toArray()
      .then(collections => collections.map(c => c.name))
  );
});

