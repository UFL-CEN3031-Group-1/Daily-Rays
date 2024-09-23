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
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(logger);
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8000', 'https://ufsase.com', 'https://uf-sase-website-prod-b303b626949f.herokuapp.com'],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', usersRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
