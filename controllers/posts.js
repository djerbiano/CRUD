const posts = require("../models/data");

const controller = {
  getAll: (req, res) => {
    res.status(200).json(posts);
  },

  getOne: (req, res) => {
    const foundPost = posts.find((post) => post.id === parseInt(req.params.id));

    if (foundPost) {
      res.status(200).json(foundPost);
    } else {
      res.status(404).send("Post doesn't exist");
    }
  },

  deletOne: (req, res) => {
    const foundPost = posts.find((post) => post.id === parseInt(req.params.id));

    if (foundPost) {
      const index = posts.indexOf(foundPost);

      posts.splice(index, 1);

      res.status(200).send("Post deleted successfully !");
    } else {
      res.status(404).send("Post doesn't exist !");
    }
  },

  updateOne: (req, res) => {
    const foundPost = posts.find((post) => post.id === parseInt(req.params.id));

    if (foundPost) {
      foundPost.userId = req.body.userId || foundPost.userId;
      foundPost.id = req.body.id || foundPost.id;
      foundPost.title = req.body.title || foundPost.title;
      foundPost.body = req.body.body || foundPost.body;

      res.status(200).send("Post updated successfully !");
    } else {
      res.status(404).send("Post doesn't exist !");
    }
  },
};

module.exports = controller;
