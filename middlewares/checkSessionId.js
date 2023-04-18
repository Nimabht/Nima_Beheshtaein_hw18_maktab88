import { store } from "../index.js";
import AppError from "../utils/AppError.js";

export default async (req, res, next) => {
  if (!req.cookies["connect.sid"]) {
    return res.redirect("/login");
  }
  const sessionId = req.cookies["connect.sid"].match(/s:(.*)\..*/)[1];
  const sessionCollection = store.client.db().collection("sessions");
  const resultFromDB = await sessionCollection.findOne({
    _id: sessionId,
  });
  if (!resultFromDB) {
    const ex = new AppError("Unauthorized", "fail", 401);
    return next(ex);
  }
  next();
};
