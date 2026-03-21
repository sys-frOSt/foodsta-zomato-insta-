const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodpartnerRoutes = require('./routes/foodpartner.routes');
const cors = require('cors');

const defaultAllowedOrigins = ['http://localhost:5173'];
const envOrigins = (process.env.FRONTEND_URLS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.FRONTEND_URL) {
  envOrigins.push(process.env.FRONTEND_URL.trim());
}

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envOrigins])];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser tools and same-origin requests with no Origin header.
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('CORS origin not allowed'));
  },
  credentials: true,
};

const app = express();
app.set('trust proxy', 1);
app.use(cors(corsOptions));

app.use(cookieParser());//for parsing cookies
app.use(express.json());
//to enable cors


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);//for auth routes
app.use('/api/food', foodRoutes);//for food routes
app.use('/api/foodpartner', foodpartnerRoutes);//for foodpartner routes

module.exports = app;