import "dotenv/config";
import mongoose from "mongoose";

function connect() {
  const db_uri = process.env.DB_URI as string;
  return mongoose
    .connect(db_uri)
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log(error);
      console.log("Could not connect to db");
      process.exit(1);
    });
}
export default connect;
