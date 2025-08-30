import { suppliers } from '../mock-data/suppliers.data.js';
import Joi from 'joi';

// Definición del esquema de validación para un proveedor
const supplierSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  nombreComercial: Joi.string().min(5).max(50).required().messages({
    'string.base': 'El nombre comercial debe ser una cadena de texto',
    'string.empty': 'El nombre comercial no puede estar vacío',
    'string.min': 'El nombre comercial debe tener al menos 5 carácter',
    'string.max': 'El nombre comercial no puede exceder los 50 caracteres',
    'any.required': 'El nombre comercial es obligatorio',
  }),
  telefono: Joi.string().min(8).max(8).required(),
  email: Joi.string().email().required()
});

// handler para el metodo get 
const getSuppliersHandler = async (req, res) => {
  try {
    res.status(200).json({
      message: "success",
      data: {
        suppliers,
        count: suppliers.length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getSupplierHandlerByParam = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = suppliers.find(c => c.id == id);

    if (!supplier) {
      return res.status(404).json({ message: "supplier no encontrado" });
    }

    res.status(200).json({
      message: "success",
      data: supplier
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST crear
const postSupplierHandler = async (req, res) => {
  try {
    const newSupplier = req.body;

    const { error } = supplierSchema.validate(newSupplier, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(e => e.message) });
    }

    const supplier = suppliers.find(c => c.id == newSupplier.id);
    if (supplier) {
      return res.status(409).json({ message: "supplier ya existe" });
    }

    suppliers.push(newSupplier);

    res.status(201).json({
      message: "success",
      data: { supplierId: newSupplier.id }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT actualizar
const updateSupplierHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSupplier = req.body;
    // Validación
    const { error } = supplierSchema.validate(updatedSupplier, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(e => e.message) });
    }

    const index = suppliers.findIndex(c => c.id == id);
    if (index === -1) {
      return res.status(404).json({ message: "supplier no encontrado" });
    }

    // Actualiza el proveedor despues de validar
    suppliers[index] = updatedSupplier;

    res.status(200).json({
      message: "success",
      data: suppliers[index]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// DELETE eliminar
const deleteSupplierHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const index = suppliers.findIndex(c => c.id == id);

    if (index === -1) {
      return res.status(404).json({ message: "supplier no encontrado" });
    }

    const deletedSupplier = suppliers.splice(index, 1);

    res.status(200).json({
      message: "success",
      data: deletedSupplier[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export {
  getSuppliersHandler,
  getSupplierHandlerByParam,
  postSupplierHandler,
  updateSupplierHandler,
  deleteSupplierHandler
};
