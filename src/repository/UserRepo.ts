import { Knex } from "./Knex";
import { User } from "../interface/UserInterface";
/**
 * 記得frontend and backend 的filed name 都是用camel case, 只有db的field name是用snake case.
 * 所以在匯入前db前，都要先create a object with snake case, 再匯入db
 */
export class UserRepo {
  private knex: Knex;

  constructor() {
    this.knex = new Knex();
  }

  /*
  when you define an asynchronous method using the async keyword, it must return a Promise<T> where T is the type of the value you intend to resolve with the promise. 
   */
  public get = async ({
    id,
    username,
    password,
    registrationDate,
    lastLoginDate,
    userStatus,
  }: {
    id?: number;
    username?: string;
    password?: string;
    registrationDate?: Date;
    lastLoginDate?: Date;
    userStatus?: string;
  }): Promise<object[]> => {
    /*
    既使FE只傳了username and password, 一樣可以成功get, 因為other parameter are optional
    */
    try {
      const query = this.knex.db.select("*").from("user");

      if (id != null) {
        query.where("id", id);
      }
      if (username != null && username !== undefined) {
        query.where("username", username);
      }
      if (password != null && password.length !== undefined) {
        query.where("password", password);
      }
      if (registrationDate != null) {
        query.where("registration_date", registrationDate);
      }
      if (lastLoginDate != null) {
        query.where("last_login_date", lastLoginDate);
      }
      /*
      我原本是用 userStatus.length != 0
      但假設FE 傳來的data 沒有userStauts
      那在BE 的userStatus field 就會是undefined
      而undefined 是沒有.length method
      所以會報錯
      */
      if (userStatus !== undefined && userStatus != null) {
        query.where("user_status", userStatus);
      }

      const rows = await query; // 执行查询并获取结果

      return rows; // 返回查询结果
    } catch (e) {
      console.error(e);
    }
  };

  public create = async (user: User) => {
    try {
      const temp_data = {
        id: user.id,
        username: user.username,
        password: user.password,
        registration_date: user.registrationDate,
        last_login_date: user.lastLoginDate,
        user_status: user.userStatus,
      };

      // ex: result = [1,2,3], 代表插入data的id
      const result:number[] = await this.knex.db("user").insert(temp_data);
      return result;
    } catch (e) {
      console.error(e.message);
    }
  };

  public update = async (user: User) => {
    try {
      const temp_data = {
        id: user.id,
        username: user.username,
        password: user.password,
        registration_date: user.registrationDate,
        last_login_date: user.lastLoginDate,
        user_status: user.userStatus,
      };
      const result:number = await this.knex
        .db("user")
        .where("id", temp_data.id)
        .update(temp_data);
      return result;
    } catch (e) {
      console.error(e.message);
    }
  };

  public delete = async (id: number) => {
    try {
      const query:number = await this.knex.db("user").where("id", id).del();
      return query;
    } catch (e) {
      console.error(e.message);
    }
  };
}
