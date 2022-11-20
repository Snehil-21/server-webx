require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Auth = require('./routes/Auth');
const Product = require('./routes/Product');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb Connected!');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

connectDB();

app.use('/auth', Auth);
app.use('/product', Product);

app.get('/', (req, res) => {
    res.send('Welcome to Meet.Ly!');
})

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}!`);
})