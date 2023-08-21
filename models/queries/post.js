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
};

module.exports = queries;

/*64e38a27e486b9b3cd36e7d9 */
