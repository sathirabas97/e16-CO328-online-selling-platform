'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

// GET 
router.get('/:token/:day/:month/:year', authService.isAdmin , controller.getByDate);
router.get('/customer/:id', controller.getByCustomerId);
router.get('/status/:status', authService.isAdmin, controller.getByStatus);


// POST
router.post('/', authService.authorize, controller.checkStock, controller.post);
router.post('/date', authService.isAdmin, controller.getByDate);


module.exports = router;