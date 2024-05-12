import express from "express";
// post(create) and login method need to use AutoFill
export class AutoFill {
  // When create new table data, both registrationDate and lastLoginDate need to autofill.
  public autoFill = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    try {
      // get full url(with query string) then turn into lower case
      const fullUrl = req.originalUrl.toLowerCase();
      const currentDate:Date = new Date();

      // even if the data pass by frontend does not include these two fields,it is still possible to add them.
      // for this case, it add these two field to request body(json)

      /*
      Query parameters are typically read-only: In Express.js, req.query is designed to hold read-only query parameters extracted from the URL. Attempting to modify req.query directly is not recommended and may lead to unexpected behavior.
      So it can not use like:
      req.query.registrationDate = currentDate;
      */
      if (fullUrl.includes("signIn".toLowerCase())) {
        req.body.loginTime = currentDate;

        // not yet finish, but for login method, ir also need to change the data's lastLoginDate column.
      } else if (fullUrl.includes("register")) {
        req.body.createTime = currentDate;
        req.body.loginTime = currentDate;
      } else {
        return;
      }

      return next();
    } catch (e) {
      console.log(e.message);
    }
  };
  // Login method only need to autoFill the lastLoginDate
}
