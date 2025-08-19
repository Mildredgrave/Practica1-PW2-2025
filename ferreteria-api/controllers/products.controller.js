import { products } from '../mock-data/products.data.js';

// Obtener todos los productos
const getProductsHandler = async (req, res) => {
  try {
    let response = {
      message: "success",
      data: {
        products: products,
        count: products.length
      }
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
const getProductHandlerByParam = async (req, res) => {
  try {
    const id = req.params.id;
    const product = products.find(p => p.id == id);

    if (!product) {
      return res.status(404).json({ message: "producto no encontrado" });
    }

    return res.status(200).json({ message: "success", data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Agregar un nuevo producto
const postProductHandler = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = products.find(p => p.id == newProduct.id);

    if (product) {
      return res.status(409).json({ message: "producto ya existe" });
    }

    if (!newProduct.name || newProduct.name.trim() === "") {
      return res.status(400).json({ message: "Se requiere el nombre del producto" });
    }

    products.push(newProduct);

    return res.status(201).json({
      message: "success",
      data: { productId: newProduct.id }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un producto existente
const putProductHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const productIndex = products.findIndex(p => p.id == id);

    if (productIndex === -1) {
      return res.status(404).json({ message: "producto no encontrado" });
    }

    products[productIndex] = { ...products[productIndex], ...req.body };

    return res.status(200).json({
      message: "success",
      data: products[productIndex]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar un producto existente
const deleteProductHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const productIndex = products.findIndex(p => p.id == id);

    if (productIndex === -1) {
      return res.status(404).json({ message: "producto no encontrado" });
    }

    const deletedProduct = products.splice(productIndex, 1);

    return res.status(200).json({
      message: "success",
      data: deletedProduct[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export {
  getProductsHandler,
  getProductHandlerByParam,
  postProductHandler,
  putProductHandler,
  deleteProductHandler
};
