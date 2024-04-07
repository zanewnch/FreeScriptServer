import knex from "knex";

export class Knex {
  public db;

  constructor() {
    this.db = knex({
      client: "mysql2",
      connection: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      },
    });
  }

  
}
