const express = require("express");
const controller = require("./controllers/posts");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log(`${req.method}${req.path}`);
  res.status(200).send("<h1>Welcom to the home page</h1>");
});

app.get("/posts", controller.getAll);
app.get("/posts/:id", controller.getOne);
app.delete("/posts/:id", controller.deletOne);
app.patch("/posts/:id", controller.updateOne);

app.get("*", (req, res) => {
  console.log(`${req.method}${req.path}`);
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(port, () => console.log(`listen server on port ${port}`));
