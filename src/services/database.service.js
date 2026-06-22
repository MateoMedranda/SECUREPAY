class DatabaseService {

  findById(id) {
    throw new Error('Método findById debe ser implementado');
  }

  findAll() {
    throw new Error('Método findAll debe ser implementado');
  }

  update(id, data) {
    throw new Error('Método update debe ser implementado');
  }

  save(data) {
    throw new Error('Método save debe ser implementado');
  }
}

module.exports = DatabaseService;