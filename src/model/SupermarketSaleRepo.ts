import { Knex } from "./Knex";
import { SupermarketSale } from "../interface/SupermarketSale";
export class SupermarketSaleRepo {
  private knex: Knex;

  constructor() {
    this.knex = new Knex();
  }

  public get = async ({
    id,
    branch,
    city,
    customerType,
    gender,
    productLine,
    unitPrice,
    quantity,
    tax5Percent,
    total,
    date,
    time,
    payment,
    cogs,
    grossMarginPercentage,
    grossIncome,
    rating,
  }: {
    id?: number;
    branch?: string;
    city?: string;
    customerType?: string;
    gender?: string;
    productLine?: string;
    unitPrice?: number;
    quantity?: number;
    tax5Percent?: number;
    total?: number;
    date?: Date | null;
    time?: Date | null;
    payment?: string;
    cogs?: number;
    grossMarginPercentage?: number;
    grossIncome?: number;
    rating?: number;
  }) => {
    try {
      const query = this.knex.db.select("*").from("supermarket");
      if (id != null && id !== undefined) {
        query.where("id", id);
      }
      if (branch != null && branch !== undefined) {
        query.where("branch", branch);
      }

      if (city != null&& city !== undefined) {
        query.where("city", city);
      }

      if (customerType != null&& customerType !== undefined) {
        query.where("customer_type", customerType);
      }

      if (gender != null&& gender !== undefined) {
        query.where("gender", gender);
      }

      if (productLine != null&& productLine !== undefined) {
        query.where("product_line", productLine);
      }

      if (unitPrice != null&& unitPrice !== undefined) {
        query.where("unit_price", unitPrice);
      }

      if (quantity != null&& quantity !== undefined) {
        query.where("quantity", quantity);
      }

      if (tax5Percent != null&& tax5Percent !== undefined) {
        query.where("tax_5_percent", tax5Percent);
      }

      if (total != null&& total !== undefined) {
        query.where("total", total);
      }

      if (date != null&& date !== undefined) {
        query.where("date", date);
      }

      if (time != null&& time !== undefined) {
        query.where("time", time);
      }

      if (payment != null&& payment !== undefined) {
        query.where("payment", payment);
      }

      if (cogs != null&& cogs !== undefined) {
        query.where("cogs", cogs);
      }

      if (grossMarginPercentage != null&& grossMarginPercentage !== undefined) {
        query.where("gross_margin_percentage", grossMarginPercentage);
      }

      if (grossIncome != null&& grossIncome !== undefined) {
        query.where("gross_income", grossIncome);
      }

      if (rating != null&& rating !== undefined) {
        query.where("rating", rating);
      }
      const rows = await query;

      return rows;
      
    } catch (error) {
      console.error(error);
    }
  };

  public create = async (supermarketSale: SupermarketSale) => {
    try {
      const temp_data = {
        id: supermarketSale.id,
        branch: supermarketSale.branch,
        city: supermarketSale.city,
        customer_type: supermarketSale.customerType,
        gender: supermarketSale.gender,
        product_line: supermarketSale.productLine,
        unit_price: supermarketSale.unitPrice,
        quantity: supermarketSale.quantity,
        tax_5_percent: supermarketSale.tax5Percent,
        total: supermarketSale.total,
        date: supermarketSale.date,
        time: supermarketSale.time,
        payment: supermarketSale.payment,
        cogs: supermarketSale.cogs,
        gross_margin_percentage: supermarketSale.grossMarginPercentage,
        gross_income: supermarketSale.grossIncome,
        rating: supermarketSale.rating,
      };

      const result = await this.knex.db("supermarket").insert(temp_data);
      console.log("SupermarketSale created:", result);
    } catch (error) {
      console.error("Error creating supermarketSale:", error);
    }
  };

  public update = async (supermarketSale: SupermarketSale) => {
    try {
      const temp_data = {
        id: supermarketSale.id,
        branch: supermarketSale.branch,
        city: supermarketSale.city,
        customer_type: supermarketSale.customerType,
        gender: supermarketSale.gender,
        product_line: supermarketSale.productLine,
        unit_price: supermarketSale.unitPrice,
        quantity: supermarketSale.quantity,
        tax_5_percent: supermarketSale.tax5Percent,
        total: supermarketSale.total,
        date: supermarketSale.date,
        time: supermarketSale.time,
        payment: supermarketSale.payment,
        cogs: supermarketSale.cogs,
        gross_margin_percentage: supermarketSale.grossMarginPercentage,
        gross_income: supermarketSale.grossIncome,
        rating: supermarketSale.rating,
      };

      const result = await this.knex
        .db("supermarket")
        .where("id", supermarketSale.id)
        .update(temp_data);
      console.log("SupermarketSale updated:", result);
    } catch (error) {
      console.error("Error updating supermarketSale:", error);
    }
  };

  public delete = async (id: number) => {
    try {
      const result = await this.knex.db("supermarket").where("id", id).del();
      console.log("SupermarketSale deleted:", result);
    } catch (error) {
      console.error("Error deleting supermarketSale:", error);
    }
  };
}
