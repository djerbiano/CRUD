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
    const id = parseInt(req.params.id);
    try {
      const post = await queries.getOne({ id: id });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // delet le post dans la DB correspondant à l'ID dans les paramètres de la requête

  deletOne: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const post = await queries.deletOne({ id: id });
      if (post) {
        res.status(200).json({ message: "post deleted" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Créer un nouveau post dans la DB à partir des données de la requête

  addOne: async (req, res) => {
    const postData = {
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    };

    try {
      const newPost = await queries.addOne(postData);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // mettre à jour un post de la DB
  updateOne: async (req, res) => {
    let filter = { id: Number(req.params.id) };
    const update = {
      userId: req.body.userId,
      id: req.body.id,
      title: req.body.title,
      body: req.body.body,
    };

    try {
      const updatedPost = await queries.updateOne(filter, update);
      if (updatedPost) {
        res.status(200).json({ message: "Post updated" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = controller;
