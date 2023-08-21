const Post = require("../schemas/post");

const queries = {
  getAll: async () => {
    try {
      const posts = await Post.find({});
      return posts;
    } catch (err) {
      throw err;
    }
  },

  getOne: async (id) => {
    try {
      const post = await Post.findOne(id);
      return post;
    } catch (err) {
      throw err;
    }
  },

  deletOne: async (id) => {
    try {
      const posts = await Post.findOneAndDelete(id);
      return posts;
    } catch (err) {
      throw err;
    }
  },

  addOne: async (postData) => {
    try {
      const newPost = await Post.create(postData);
      return newPost;
    } catch (err) {
      throw err;
    }
  },

  updateOne: async (filter, update) => {
    try {
      const updatedPost = await Post.findOneAndUpdate(filter, update);
      return updatedPost;
    } catch (err) {
      throw err;
    }
  },
};
module.exports = queries;
