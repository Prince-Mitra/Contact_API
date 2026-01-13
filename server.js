import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import bodyParser from "body-parser";
import contactRouter from "./Routes/contact.js";
import { config } from "dotenv";

const app = express();
app.use(bodyParser.json()); //app.use(bodyParser.json()); is needed so your Express app can understand JSON data sent in requests. Without it, req.body would be undefined when the client sends JSON.
config({path:'.env'})
const port = process.env.PORT;

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      dbName: "full-authenticate-API",
    }
  )
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => console.log(err));

// create home route
app.get("/", (req, res) => {
  res.json({ message: "This is home route and working" });
});
// user route
app.use("/api/user", userRouter);

//contact routes
app.use("/api/contact", contactRouter);
app.listen(port, () => {
  console.log(`server is running at port in ${port}`);
});
