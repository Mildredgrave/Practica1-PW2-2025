module.exports = (service, requiredFields = []) => {

  function validateBody(body) {
    const missing = requiredFields.filter(f => !(f in body));
    return missing;
  }

  return {
    getAll: async (req, res, next) => {
      try {
        const items = await service.getAll();
        res.status(200).json(items);
      } catch (err) { next(err); }
    },

    getById: async (req, res, next) => {
      try {
        const id = req.params.id;
        const item = await service.getById(id);
        if (!item) return res.status(404).json({ error: 'No encontrado' });
        res.status(200).json(item);
      } catch (err) { next(err); }
    },

    create: async (req, res, next) => {
      try {
        const body = req.body;
        const missing = validateBody(body);
        if (missing.length) return res.status(400).json({ error: 'Faltan campos', missing });
        const newItem = await service.create(body);
        res.status(201).json(newItem);
      } catch (err) { next(err); }
    },

    update: async (req, res, next) => {
      try {
        const id = req.params.id;
        const body = req.body;
        const updated = await service.update(id, body);
        if (!updated) return res.status(404).json({ error: 'No encontrado para actualizar' });
        res.status(200).json(updated);
      } catch (err) { next(err); }
    },

    remove: async (req, res, next) => {
      try {
        const id = req.params.id;
        const deleted = await service.remove(id);
        if (!deleted) return res.status(404).json({ error: 'No encontrado para eliminar' });
        res.status(200).json({ message: 'Eliminado correctamente' });
      } catch (err) { next(err); }
    }
  };
};