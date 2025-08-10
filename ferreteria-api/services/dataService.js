// services/dataService.js
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function createDataService(filename) {
  const filePath = path.join(__dirname, '..', 'mock-data', filename);
  let cache = null;

  async function load() {
    if (cache) return cache;
    try {
      const content = await fs.readFile(filePath, 'utf8');
      cache = JSON.parse(content);
    } catch (err) {
      if (err.code === 'ENOENT') {
        cache = [];
        await save();
      } else throw err;
    }
    return cache;
  }

  async function save() {
    await fs.writeFile(filePath, JSON.stringify(cache, null, 2), 'utf8');
  }

  return {
    async getAll() {
      return (await load()).slice();
    },
    async getById(id) {
      return (await load()).find(item => String(item.id) === String(id));
    },
    async create(data) {
      const list = await load();
      const newItem = { id: uuidv4(), ...data };
      list.push(newItem);
      await save();
      return newItem;
    },
    async update(id, data) {
      const list = await load();
      const idx = list.findIndex(i => String(i.id) === String(id));
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, id: String(id) };
      await save();
      return list[idx];
    },
    async remove(id) {
      const list = await load();
      const idx = list.findIndex(i => String(i.id) === String(id));
      if (idx === -1) return false;
      list.splice(idx, 1);
      await save();
      return true;
    }
  };
}

module.exports = createDataService;