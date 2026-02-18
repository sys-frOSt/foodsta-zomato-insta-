require('dotenv').config();//for loading .env variables
const app = require('./src/app');
const connectdb = require('./src/db/db');

connectdb();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});