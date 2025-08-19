import { Router } from 'express';
import categoriesRoute from './categories.router.js';
import customersRoute from './customers.router.js';
import productsRoute from './products.router.js';
import suppliersRoute from './suppliers.route.js';

const router = Router();

router.use('/categories', categoriesRoute);
router.use('/customers', customersRoute);
router.use('/products', productsRoute);
router.use('/suppliers', suppliersRoute);

export default router;
