const express = require("express");
const controller = require("./controllers/posts");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Middleware pour enregistrer les informations de la requête
const logger = (req, res, next) => {
  console.log(
    `Date : ${new Date().toISOString()} method: ${req.method} URL: ${req.path}`
  );
  next();
};
app.use(logger);

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcom to the home page</h1>");
});

// Routes pour interagir avec les articles (posts)
app.get("/posts", controller.getAll);
app.get("/posts/:id", controller.getOne);
app.post("/posts", controller.addOne);
app.delete("/posts/:id", controller.deletOne);
app.patch("/posts/:id", controller.updateOne);

// Route pour gérer les erreurs 404 (page non trouvée)
app.get("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

// Démarrer le serveur
app.listen(port, () => console.log(`listen server on port ${port}`));
