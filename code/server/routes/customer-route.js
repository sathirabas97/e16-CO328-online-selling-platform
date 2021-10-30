'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

// GET
router.get('/authenticate/:email/:password', controller.authenticate);
router.get('/:id', controller.getById);

// POST
router.post('/', controller.post);

// PUT
router.put('/:id', authService.authorize, controller.put, controller.uploadImage);
router.put('/admin/:token', authService.isAdmin, controller.putAdmin);

// DELETE
router.delete('/:id', authService.isAdmin ,controller.delete);

module.exports = router;