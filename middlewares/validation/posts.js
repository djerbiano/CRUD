const rules = {
  userId: (req, res, next) => {
    if (req.body.userId) {
      const userId = req.body.userId;

      if (isNaN(userId)) {
        next({
          name: "validation error",
          element: "params : userId",
          message: "The post userId must be a number",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  },

  id: (req, res, next) => {
    const id = req.params.id;
    const pattern = /^([1-9][0-9]{0,2})$/;
    if (pattern.test(id)) {
      next();
    } else {
      next({
        name: "validation error",
        element: "params : id",
        message: "The post id must be a number from 1-100",
      });
    }
  },
  postInfinitId: (req, res, next) => {
    const id = req.body.id;
    const pattern = /^[1-9][0-9]*$/;
    if (pattern.test(id)) {
      next();
    } else {
      next({
        name: "validation error",
        element: "params : id",
        message: "The post id must be a number",
      });
    }
  },
  title: (req, res, next) => {
    let title = req.body.title;
    if (typeof title === "number") {
      title = title.toString();
    }

    title = typeof title === "string" ? title.trim() : undefined;
    if (title) {
      if (title.length < 7 || title.length > 70) {
        next({
          name: "validation error",
          element: "body : title",
          message: "The title length should be between 7 and 70 chars",
        });
      }
      req.body.title = title;
      next();
    } else {
      next();
    }
  },

  body: (req, res, next) => {
    let body = req.body.body;
    if (typeof body === "number") {
      body = body.toString();
    }

    body = typeof body === "string" ? body.trim() : undefined;

    if (body) {
      if (body.length < 10 || body.length > 1000) {
        next({
          name: "validation error",
          element: "body : body",
          message: "The post body length should be between 10 and 1000 chars",
        });
      }
      req.body.body = body;
      next();
    } else {
      next();
    }
  },

  titleRequired: (req, res, next) => {
    if (req.body.title) {
      next();
    } else {
      next({
        name: "validation error",
        element: "body : title",
        message: "The post title is required",
      });
    }
  },

  bodyRequired: (req, res, next) => {
    if (req.body.body) {
      next();
    } else {
      next({
        name: "validation error",
        element: "body : body",
        message: "The post body is required",
      });
    }
  },

  titleNotEmpty: (req, res, next) => {
    const title = req.body.title;

    if (title === "" || !title) {
      next({
        name: "validation error",
        element: "body : title",
        message: "The post title cannot be empty",
      });
    }

    next();
  },

  bodyNotEmpty: (req, res, next) => {
    let body = req.body.body;

    if (typeof body === "string") {
      body = body.trim();
    } else {
      next({
        name: "validation error",
        element: "body : body",
        message: "The post body cannot be number",
      });
    }

    if (body === "") {
      next({
        name: "validation error",
        element: "body : body",
        message: "The post body cannot be empty",
      });
    }

    next();
  },
};
const validate = {
  getOne: [rules.id],
  addOne: [rules.titleRequired, rules.title, rules.bodyRequired, rules.body],
  updateOne: [
    rules.userId,
    rules.id,
    rules.titleNotEmpty,
    rules.title,
    rules.bodyNotEmpty,
    rules.body,
  ],
  deleteOne: [rules.id],
};

module.exports = validate;
