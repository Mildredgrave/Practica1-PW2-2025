//import express from express;
import {Router} from 'express';
import { 
    getCategoriesHandler,
    getCategoryHandlerByParam,
    postCategoryHandler,
    putCategoryHandler,
    deleteCategoryHandler
} from '../controllers/categories.controller.js';

const router = Router();

router.get('/', getCategoriesHandler);
router.get('/:id', getCategoryHandlerByParam);  
router.post('/', postCategoryHandler);
router.put('/:id', putCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;