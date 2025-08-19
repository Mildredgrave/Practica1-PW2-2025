import { customers } from '../mock-data/customers.data.js';

// Obtener todos los clientes
const getCustomersHandler = async (req, res) => {
  try {
    let response = {
      message: "success",
      data: {
        customers: customers,
        count: customers.length
      }
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener un cliente por ID
const getCustomerHandlerByParam = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = customers.find(c => c.id == id);

    if (!customer) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }

    return res.status(200).json({ message: "success", data: customer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Agregar un nuevo cliente
const postCustomerHandler = async (req, res) => {
  try {
    const newCustomer = req.body;
    const customer = customers.find(c => c.id == newCustomer.id);

    if (customer) {
      return res.status(409).json({ message: "cliente ya existe" });
    }

    if (!newCustomer.name || newCustomer.name.trim() === "") {
      return res.status(400).json({ message: "Se requiere el nombre del cliente" });
    }
    // Opcionalmente podrías validar más campos como email, phone, address

    customers.push(newCustomer);

    return res.status(201).json({
      message: "success",
      data: { customerId: newCustomer.id }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un cliente existente
const putCustomerHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const customerIndex = customers.findIndex(c => c.id == id);

    if (customerIndex === -1) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }

    customers[customerIndex] = { ...customers[customerIndex], ...req.body };

    return res.status(200).json({
      message: "success",
      data: customers[customerIndex]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar un cliente existente
const deleteCustomerHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const customerIndex = customers.findIndex(c => c.id == id);

    if (customerIndex === -1) {
      return res.status(404).json({ message: "cliente no encontrado" });
    }

    const deletedCustomer = customers.splice(customerIndex, 1);

    return res.status(200).json({
      message: "success",
      data: deletedCustomer[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export {
  getCustomersHandler,
  getCustomerHandlerByParam,
  postCustomerHandler,
  putCustomerHandler,
  deleteCustomerHandler
};
