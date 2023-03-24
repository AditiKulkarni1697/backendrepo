const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/notes.routes");
const { auth } = require("./Middlewares/authrization");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use(auth);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection();
    console.log("DB is connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running at ${process.env.PORT}`);
});
