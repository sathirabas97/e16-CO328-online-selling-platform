'uses strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

// Config
const app = express();
const router = express.Router();

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');
const serviceRoute = require('./routes/service-route');
const petRoute = require('./routes/pet-route');
const scheduleRoute = require('./routes/schedule-route');

// Carregando Models
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Service = require('./models/Service');
const Pet = require('./models/Pet');
const Schedule = require('./models/Schedule');

// MiddleWares
app.use(express.json());
app.use(express.static('public'));

  // Cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

  // Body-Parser
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);
app.use('/services', serviceRoute);
app.use('/pets', petRoute);
app.use('/schedules', scheduleRoute);

// Conect to the database
const uri = config.connectionString;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
  })
.then(() => {
    console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

module.exports = app;