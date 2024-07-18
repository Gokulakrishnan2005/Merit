import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js';
import documentRouter from './routes/document.route.js';
import path from 'path';
dotenv.config();
  

// MongoDB connection
mongoose.connect(process.env.MONGO).then(() => {    
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

const __dirname = path.resolve();

// Create an Express app  
const app = express();

// Define a port for the app to listen on
const port = 3000;

//permission to use json in api server
app.use(express.json());

// Start the app
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use('/api/user', router);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/documents', documentRouter);

app.use(express.static(path.join(__dirname, '/client/bist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({ 
    success: false, 
    statusCode,
    message,
   }); 
});
