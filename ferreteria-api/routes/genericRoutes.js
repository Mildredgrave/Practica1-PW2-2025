// routes/genericRoutes.js
const express = require('express');

module.exports = (controller) => {
    const router = express.Router();
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.remove);
    return router;
};