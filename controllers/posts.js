const posts = require("../models/data");

const controller = {
  getAll: (req, res) => {
    res.status(200).json(posts);
  },

  getOne: (req, res) => {
    // Trouver le post correspondant à l'ID dans les paramètres de la requête
    const foundPost = posts.find((post) => post.id === parseInt(req.params.id));

    if (foundPost) {
      // Renvoyer le post trouvé si existant
      res.status(200).json(foundPost);
    } else {
      // Renvoyer une erreur 404 si le post n'existe pas
      res.status(404).send("Post doesn't exist");
    }
  },

  addOne: (req, res) => {
    // Créer un nouveau post à partir des données de la requête
    const post = {
      userId: req.body.userId,
      id: posts[posts.length - 1].id + 1,
      title: req.body.title,
      body: req.body.body,
    };
    // Ajouter le nouveau post au tableau
    posts.push(post);
    res.status(200).send("post is added");
  },

  deletOne: (req, res) => {
    // Trouver le post correspondant à l'ID dans les paramètres de la requête
    const foundPost = posts.find((post) => post.id === parseInt(req.params.id));

    if (foundPost) {
      // Trouver l'index du post et le supprimer du tableau
      const index = posts.indexOf(foundPost);

      posts.splice(index, 1);

      res.status(200).send("Post deleted successfully !");
    } else {
      res.status(404).send("Post doesn't exist !");
    }
  },

  updateOne: (req, res, next) => {
    // Trouver le post correspondant à l'ID dans les paramètres de la requête
    const foundPost = posts.find((post) => post.id === parseInt(req.params.id));

    if (foundPost) {
      // Mettre à jour les propriétés du post avec les nouvelles données de la requête

      if (!req.body.title && !req.body.body) {
        res
          .status(200)
          .json({ message: "you haven't modified all the values" });
      } else {
        foundPost.userId = req.body.userId || foundPost.userId;
        foundPost.id = req.body.id || foundPost.id;
        foundPost.title = req.body.title || foundPost.title;
        foundPost.body = req.body.body || foundPost.body;

        res.status(200).send("Post updated successfully !");
      }
    } else {
      res.status(404).send("Post doesn't exist !");
    }
  },
};

module.exports = controller;
