import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import config from "../config";
import routes from "./routes";
import connect from "./utils/connect";

declare const Buffer: any;
const app = express();
app.use(cors());
app.use(express.json({ limit: "200mb" }));
const PORT = config.PORT;

function authentication(req: Request, res: Response, next: NextFunction) {
  var authheader = req.headers.authorization;
  console.log(req.headers);

  if (!authheader) {
    var err: any = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    res.status(403).send('Invalid authorization data provided. Please check username and pwd');
    return next(res);
  }

  var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  if (user == 'admin' && pass == 'photojaanic') {

    // If Authorized user
    next();
  } else {
    var err: any = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).send('Invalid authorization data provided. Please check username and pwd');
  }

}
app.use(authentication);
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Running Node with Express and Typescript",
  });
});
app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}.`);
  await connect();
  routes(app);
});
