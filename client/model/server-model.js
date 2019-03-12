const config = require('../../api.config')
const createDb = require('../../server/db/db')

const db = createDb(config.db.appID, config.db.appKey)

export default {
  getAllTodos() {
    return db.getAllTodos()
  }
}
