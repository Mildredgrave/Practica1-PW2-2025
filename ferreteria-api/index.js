const express = require('express');
const createDataService = require('./services/dataService');
const createController = require('./controllers/genericController');
const createRoutes = require('./routes/genericRoutes');

const app = express();
app.use(express.json());

const collections = 
  [
    { 
      route: 'products', 
      file: 'products.json', 
      required: 
        ['name', 'price', 'stock'] 
    },

    { 
      route: 'categories', 
      file: 'categories.json', 
      required: 
        ['name'] 
    },

    { 
      route: 'suppliers', 
      file: 'suppliers.json', 
      required: 
        ['name', 'phone', 'email'] 
    },

    { 
      route: 'customers', 
      file: 'customers.json', 
      required: 
        ['name', 'phone'] 
    },

    { 
      route: 'sales', 
      file: 'sales.json', 
      required: 
      ['customerId', 'items'] 
    },
];

// Función para colección (ruta + controlador + servicio)
function mountCollection({ route, file, required }) {
  const service = createDataService(file);
  const controller = createController(service, required);
  const router = createRoutes(controller);
  app.use(`/api/${route}`, router);
}

// todas las colecciones
collections.forEach(mountCollection);

//rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

//  manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor Iniciado`);
});
