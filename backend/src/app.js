const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true // allow cookies to be sent
}));

app.use(cookieParser());//for parsing cookies
app.use(express.json());
//to enable cors


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);//for auth routes
app.use('/api/food', foodRoutes);//for food routes

module.exports = app;