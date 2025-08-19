import { Router } from 'express';
import { 
  getSuppliersHandler,
  getSupplierHandlerByParam,
  postSupplierHandler,
  updateSupplierHandler,
  deleteSupplierHandler,
} from '../controllers/suppliers.controller.js';

const router = Router();

router.get('/', getSuppliersHandler);
router.get('/:id', getSupplierHandlerByParam);
router.post('/', postSupplierHandler);
router.put('/:id', updateSupplierHandler);
router.delete('/:id', deleteSupplierHandler);

export default router;