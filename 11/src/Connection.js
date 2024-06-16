import pgp from 'pg-promise'

export class Connection {
  
  constructor () {
    this.connection = pgp()("postgres://postgres:docker@localhost:5432/app")
  }

  query (statement, params) {
    return this.connection.query(statement, params)
  }

  async close() {
    await this.connection.$pool.end()
  }
}