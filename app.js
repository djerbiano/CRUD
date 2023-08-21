const express = require("express");
const postsRouter = require("./routes/posts");

const db = require("./config/db");
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

// Route pour interagir avec les articles (posts)
app.use("/posts", postsRouter);

// Middleware pour gérer les erreurs

const errMiddleware = (err, req, res, next) => {
  console.error(err);

  const errorResponse = {
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
  };

  res.status(err.status || 404).json(errorResponse);
};

app.use(errMiddleware);

// Route pour gérer les erreurs 404 (page non trouvée)
app.get("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

// Démarrer le serveur
app.listen(port, () => console.log(`listen server on port ${port}`));
