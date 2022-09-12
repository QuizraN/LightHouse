const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const { PrismaClient } = require("@prisma/client");
const router = require("./routes/companiesRoute");
const likesrouter = require("./routes/likesRoute");
const groupsrouter = require("./routes/groupsRoute");
const initrouter = require("./routes/initRoute");
const authMiddleware = require("./auth-middleware");

let port = process.env.PORT || 3001;

app.use(express.json());
console.log("before auth-middleware");
app.use("/", authMiddleware);
console.log("after auth-middleware");


app.use("/apis/companies", router);
app.use("/apis/companies", likesrouter);
app.use("/apis/companies/:cid/groups",groupsrouter);
app.use("/apis/init",initrouter)

app.use("/", (req, res) => {
  //console.log(req);
  res.send("Welcome to the Home Page!");
});


app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
