import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import router from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import documentRouter from './routes/document.route.js';

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
  });

const __dirname = path.resolve();

// Create an Express app
const app = express();

// Define a port for the app to listen on
const port = process.env.PORT || 3000; // Use the PORT environment variable if available

// Allow Express to parse JSON
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist')));



app.use('/api/user', router);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/documents', documentRouter);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({ 
    success: false, 
    statusCode,
    message,
  }); 
});

// Start the app
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
