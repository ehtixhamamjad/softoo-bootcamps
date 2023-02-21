const express = require("express");

const app = express();

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  const id = users.length + 1;
  users.push({ id, name });
  res.json({ id, name });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === Number(id));
  if (index !== -1) {
    users.splice(index, 1);
  }
  res.json({ message: "User deleted" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
