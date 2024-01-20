import mysql, { Connection } from "mysql2";

export class MySQL {
  public connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "polaroid628",
      database: "sideProject",
    });

    this.connect();
  }

  public connect = (): void => {
    this.connection.connect((error) => {
      if (error) {
        console.error("Error connecting to the database:", error);
        return;
      }
      console.log("Connected to the MySQL server.");
    });
  }
}
