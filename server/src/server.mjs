import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Middleware
import logger from './middleware/logger.mjs';

// Routes
import usersRouter from './routes/users.mjs';

const app = express();
const port = process.env.PORT || 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(logger);
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8000', 'https://dailyrays.com'], //TODO: add vercel url here
  credentials: true,
};
app.use(cors(corsOptions));

// Routes for API
app.use('/api/users', usersRouter);

// 404 Handler for API routes
app.use('/api/*', (req, res, next) => {
  res.status(404).json({ message: 'API route not found' });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for serving React app (frontend routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
