const posts = require("../models/data");
const queries = require("../models/queries/post");
const Post = require("../models/schemas/post");
const controller = {
  getAll: async (req, res, next) => {
    try {
      const posts = await queries.getAll();
      if (posts.length > 0) {
        res.status(200).json({ posts: posts });
      } else {
        res.status(200).json({ message: "no posts added yet" });
      }
    } catch (error) {
      next(error);
    }
  },

  // Trouver le post dans la DB correspondant à l'ID dans les paramètres de la requête
  getOne: async (req, res) => {
    const y = parseInt(req.params.id);
    try {
      const post = await queries.getOne({ id: y });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
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

      if (
        !req.body.userId &&
        !req.body.id &&
        !req.body.title &&
        !req.body.body
      ) {
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
