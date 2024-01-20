import express from "express";
import { MySQL } from "../repository/MySQL";

const mysql = new MySQL();
const connection = mysql.connection;

export const test = async (req: express.Request, res: express.Response) => {
  try {
    connection.query("SELECT * FROM user", (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results);
    });

    // return res.status(200).json({message: 'test'});
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
