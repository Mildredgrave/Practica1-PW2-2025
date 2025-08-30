import { suppliers } from '../mock-data/suppliers.data.js';

// handler para el metodo GET 
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

// handler para el metodo GET 
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

    // valida que no exista el mismo id
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

    const index = suppliers.findIndex(c => c.id == id);
    if (index === -1) {
      return res.status(404).json({ message: "supplier no encontrado" });
    }

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
