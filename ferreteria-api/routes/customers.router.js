import { Router } from 'express';
import {    
    getCustomersHandler,
    getCustomerHandlerByParam,
    postCustomerHandler,
    putCustomerHandler,
    deleteCustomerHandler,
} from '../controllers/customers.controller.js';

const router = Router();

router.get('/', getCustomersHandler);
router.get('/:id', getCustomerHandlerByParam);  
router.post('/', postCustomerHandler);
router.put('/:id', putCustomerHandler);
router.delete('/:id', deleteCustomerHandler);


export default router;