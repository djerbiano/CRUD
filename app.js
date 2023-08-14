const express = require("express");
const app = express();
app.use(express.json());

const users = [
  {
    username: "test1",
    name: "Ali",
  },
  {
    username: "test2",
    name: "Samia",
  },
  {
    username: "test3",
    name: "Nawras",
  },
];

const port = process.env.PORT || 3001;

/*------------------get method---------------------------- */

app.get("/", (req, res) => {
  res.send("<h1>Welcom to users database</h1>");
});

app.get("/users", (req, res) => {
  res.status(200);
  res.json({ users: users });
});

app.get("/users/:username", (req, res) => {
  const username = req.params.username;
  const user = users.find((element) => element.username === username);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  } else {
    res.status(200).json({ user: user });
  }
});

/*-----------------post method---------------------------- */

app.post("/users", (req, res) => {
  const user = {
    username: req.body.username,
    name: req.body.name,
  };
  users.push(user);
  console.log(user);
  res.status(200);
  res.json({ user: user });
});

/*-------------------delete method -------------------------- */

app.delete("/users/:username", (req, res) => {
  const username = req.params.username;

  const user = users.find((element) => element.username === username);

  if (user === undefined) {
    res.status(404).json({ message: "user not found" });
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({ message: "user deleted succefully" });
  }
});

/*-------------------patch method -------------------------- */

app.patch("/users/:username", (req, res) => {
  const userName = req.params.username;
  const user = users.find((element) => element.username === userName);

  if (user === undefined) {
    res.status(404).json({ message: "user not found" });
  } else {
    user.username = req.body.username ? req.body.username : user.username;
    user.name = req.body.name ? req.body.name : user.name;

    res.status(200).json({ message: "user updated succefully" });
  }
});

/*-------------------listen server---------------------------------*/
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
