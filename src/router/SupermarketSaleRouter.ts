import express from "express";
import { SupermarketSaleController } from "../controller/SupermarketSaleController";
import { Knex } from "../repository/Knex";
import { get } from "lodash";
import { Result } from "../utils/Result";

const router = express.Router();
/*
測試階段：一樣都先寫在router, 這樣比較好測試，確定完成後再切分到controller,repo
*/

export default (router: express.Router) => {
  const supermarketSaleController = new SupermarketSaleController();
  const knex = new Knex();

  router.get("/api/supermarket", supermarketSaleController.get);
  router.post("/api/supermarket", supermarketSaleController.create);
  router.put("/api/supermarket", supermarketSaleController.update);
  router.delete("/api/supermarket/:id", supermarketSaleController.delete);

  // getBranchList
  router.get(
    "/api/supermarket/branchList",
    async (req: express.Request, res: express.Response) => {
      const result = await knex.db("supermarket").distinct("branch").select();

      res.status(200).json(Result.successWithData(result));
    }
  );
  // getCityList
  router.get(
    "/api/supermarket/cityList",
    async (req: express.Request, res: express.Response) => {
      const result = await knex.db("supermarket").distinct("city").select();

      res.status(200).json(Result.successWithData(result));
    }
  );
  // getCustomerTypeList
  router.get(
    "/api/supermarket/customerTypeList",
    async (req: express.Request, res: express.Response) => {
      const result = await knex
        .db("supermarket")
        .distinct("customer_type")
        .select();

      res.status(200).json(Result.successWithData(result));
    }
  );

  // get totalDataAmount
  router.get(
    "/api/supermarket/totalDataAmount",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const totalquery = knex.db("supermarket").count("* as total");
        const getTotal = await totalquery;
        const totalDataAmount = getTotal[0].total;
        res.status(200).json(Result.successWithData(totalDataAmount));
      } catch (e) {
        console.log(e);
        res.status(400).json(Result.error("Error."));
      }
    }
  );

  // getByPage
  router.get(
    "/api/supermarket/:pageNum/:pageSize",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        //  path variable都會是string, 所以要轉成int
        const page = parseInt(req.params.pageNum) || 1; // default pageNum to 1
        const pageSize = parseInt(req.params.pageSize) || 10; // default pageSize to 10
        const offset = (page - 1) * pageSize;

        // get MapperReturnValue
        const query = knex.db
          .select("*")
          .from("supermarket")
          .offset(offset)
          .limit(pageSize);
        const getData = await query;

        // totalDataAmount MapperReturnValue

        res.status(200).json(Result.successWithData(getData));

        // continue processing the next middleware
        // return next();
      } catch {
        (error: Error) => {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        };
      }
    }
  );

  // barChart data
  router.get(
    "/api/supermarket/barChart",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const query = knex.db
          .select("product_line")
          .avg("total as avg_total")
          .avg("gross_income as avg_gross_income")
          .from("supermarket")
          .groupBy("product_line");

        //an array that contains objects. Each object represents a row of data.
        const rows: object[] = await query;
        console.log(rows);

        res.status(200).json(Result.successWithData(rows));
      } catch (e) {
        console.log(e);
      }
    }
  );

  // lineChart
  router.get(
    "/api/supermarket/lineChart",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        /*
        select(knex.raw("DATE_FORMAT(date, '%Y-%m') as month")): This selects the date and formats it to a 'YYYY-MM' format, essentially getting the year and month, and labels it as 'month'.
        .sum('amount as total_amount'): This calculates the total sum of the 'amount' column for each group and labels it as 'total_amount'.

        .whereBetween('date', ['2019-01-01', '2019-03-31']): This filters the records to include only those within the specified date range.

        .groupByRaw("DATE_FORMAT(date, '%Y-%m')"): This groups the results by year and month.

        .then() and .catch(): These handle the promise returned by Knex, allowing you to work with the results or catch any errors.

        Make sure to adjust the column names (date and amount) and the table name (transactions) to match your actual database schema. Also, the DATE_FORMAT function is specific to MySQL; if you're using a different database, you'll need to use the equivalent function for that database.
        */
        const query = knex
          .db("supermarket")
          .select(knex.db.raw("DATE_FORMAT(date, '%Y-%m') as month"))
          .sum("total as total_amount")
          .whereBetween("date", ["2019-01-01", "2019-03-31"])
          .groupByRaw("DATE_FORMAT(date, '%Y-%m')");

        const result = await query;

        res.status(200).json(Result.successWithData(result));
      } catch (e) {
        console.log(e);
        res.status(400).json(Result.error("error"));
      }
    }
  );
};
