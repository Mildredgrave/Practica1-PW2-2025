import { categories } from '../mock-data/categories.data.js';

// Obtener todas las categorías
const getCategoriesHandler = async (req, res) => {
  try {
    let response = {
      message: "success",
      data: {
        categories: categories,
        count: categories.length
      }
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener una categoría por ID
const getCategoryHandlerByParam = async (req, res) => {
  try {
    const id = req.params.id;
    const category = categories.find(c => c.id == id);

    if (!category) {
      return res.status(404).json({ message: "categoría no encontrada" });
    }

    return res.status(200).json({ message: "success", data: category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Agregar una nueva categoría
const postCategoryHandler = async (req, res) => {
  try {
    const newCategory = req.body;
    const category = categories.find(c => c.id == newCategory.id);

    if (category) {
      return res.status(409).json({ message: "categoría ya existe" });
    }

    if (!newCategory.name || newCategory.name.trim() === "") {
      return res.status(400).json({ message: "Se requiere el nombre de la categoría" });
    }

    categories.push(newCategory);

    return res.status(201).json({
      message: "success",
      data: { categoryId: newCategory.id }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar una categoría existente
const putCategoryHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryIndex = categories.findIndex(c => c.id == id);

    if (categoryIndex === -1) {
      return res.status(404).json({ message: "categoría no encontrada" });
    }

    categories[categoryIndex] = { ...categories[categoryIndex], ...req.body };

    return res.status(200).json({
      message: "success",
      data: categories[categoryIndex]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar una categoría existente
const deleteCategoryHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryIndex = categories.findIndex(c => c.id == id);

    if (categoryIndex === -1) {
      return res.status(404).json({ message: "categoría no encontrada" });
    }

    const deletedCategory = categories.splice(categoryIndex, 1);

    return res.status(200).json({
      message: "success",
      data: deletedCategory[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export {
  getCategoriesHandler,
  getCategoryHandlerByParam,
  postCategoryHandler,
  putCategoryHandler,
  deleteCategoryHandler
};
