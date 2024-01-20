import knex from "knex";

export class Knex {
  public db;

  constructor() {
    this.db = knex({
      client: "mysql2",
      connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "polaroid628",
        database: "sideProject",
      },
    });
  }

  
}
