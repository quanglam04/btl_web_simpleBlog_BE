const express = require("express");
const cors = require("cors");
const app = express();
const BlogPosts = require("./BlogPosts");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(cors());


app.get("/api/posts", function (req, res) {
  console.log("Request to /api/posts");
  res.send(JSON.stringify(BlogPosts)); 

});

app.get("/api/post/:slug", function (req, res) {
  console.log("Request to /api/post/:slug");
  const slug = req.params.slug;
  const post =
  BlogPosts.find((element) => element.slug === slug);
  if (post) res.send(JSON.stringify(post));
  else res.status(404).send("Not found");
});

app.get("/stats/count", (req, res) => {
  const count = Object.keys(BlogPosts).length;
  res.json({ count });
});

app.get("/posts/top/:n", (req, res) => {
  const n = parseInt(req.params.n);  
  if (isNaN(n) || n <= 0) {
    return res.status(400).json({ error: "Tham số n không hợp lệ" });
  }

  const result = Object.entries(BlogPosts)
    .slice(0, n)
    .map(([slug, post]) => ({ slug, ...post }));

  res.json(result);
});

app.post("/api/login", jsonParser, (req, res) => {
  console.log("Request to /api/login");
  const creds = {
  username: req.body.username,
  password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123")
  {
  res.status(200)
  .send({ message: "Login successful"});
  
  } else {
  res.status(400).send({ message: "Login failed"});
  }
});

app.post("/api/post", jsonParser, (req, res) => {
  console.log("Request to /api/post");
  const post = {
  slug: req.body.slug,
  title: req.body.title,
  description: req.body.description,
  };
  BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});



app.listen(8080, function () {
  console.log(`Server is running on port 8080`);
});
