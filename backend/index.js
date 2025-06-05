require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
const bookRoutes = require("./src/books/book.route");
// routes
app.use("/api/books", bookRoutes);
// username: pranavrana1258
// password: YolA09dZbtVLdDWi
async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

main()
  .then(() => console.log("Mongodb connected successfully!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
