import express from "express";
import { MySQL } from "../model/MySQL";
import { Knex } from "../model/Knex";

import { Result } from "../utils/Result";
import { SupermarketSaleRepo } from "../model/SupermarketSaleRepo";

export class SupermarketSaleController {
  private mysql: MySQL;
  private knex: Knex;
  private supermarketSaleRepo: SupermarketSaleRepo;

  constructor() {
    this.mysql = new MySQL();
    this.knex = new Knex();
    this.supermarketSaleRepo = new SupermarketSaleRepo();
  }

  public get = async (req: express.Request, res: express.Response) => {
    try {
      
      const supermarketSale = await this.supermarketSaleRepo.get(req.query);
      res.status(200).json(Result.successWithData(supermarketSale));
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  public create = async (req: express.Request, res: express.Response) => {
    try {
      const users = await this.supermarketSaleRepo.create(req.body);

      res.status(200).json(Result.success());
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json(Result.error("error"));
    }
  };
  public update = async (req: express.Request, res: express.Response) => {
    try {
      const users = await this.supermarketSaleRepo.update(req.body);

      res.status(200).json(Result.success());
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json(Result.error("error"));
    }
  };
  public delete = async (req: express.Request, res: express.Response) => {
    try {
      const users = await this.supermarketSaleRepo.delete(
        parseInt(req.params.id)
      );

      res.status(200).json(Result.success());
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json(Result.error("error"));
    }
  };

  public getBypage = async (req: express.Request, res: express.Response) => {
    /*
    我想要寫一個類似 spring boot page heloper的功能, 他會有pageNum and pageSize
    根據這兩個參數做出分頁查詢的功能
    */
    try {
    } catch (error) {}
  };
}
