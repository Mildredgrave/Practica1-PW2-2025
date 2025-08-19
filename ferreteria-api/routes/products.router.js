import { Router } from 'express';
import {    
    getProductsHandler,
    getProductHandlerByParam,
    postProductHandler,
    putProductHandler,
    deleteProductHandler
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getProductsHandler);
router.get('/:id', getProductHandlerByParam);   
router.post('/', postProductHandler);
router.put('/:id', putProductHandler);
router.delete('/:id', deleteProductHandler);

export default router;