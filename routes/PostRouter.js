const express = require("express");
const Post = require("../db/postModel");
const router = express.Router();

//-------------------api tạo mới bài viết
router.post("/post", async (request, response) => {
  const post = new Post(request.body);
  try {
    await post.save();
    response.json(post);
  } catch (error) {
    response.status(500).send(error);
  }
});

//----------------------- api login
router.post("/login", async (request, response) => {
  console.log("Request to /api/login");
  const creds = {
    username: request.body.username,
    password: request.body.password,
  };
  console.log(creds);
  if (creds.username === "admin" && creds.password === "123") {
    response.status(200).send({ message: "Login successful" });
  } else {
    response.status(400).send({ message: "Login failed" });
  }
});

//------------------ api lấy tất cả bài viết
router.get("/posts", async (request, response) => {
  try {
    const posts = await Post.find({});
    response.send(posts);
  } catch (error) {
    response.status(500).send({ error });
  }
});

//------------------api lấy bài viết theo ID
router.get("/post/:slug", async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug });
    response.send(post);
  } catch (error) {
    response.status(500).send({ error });
  }
});

//-----------------api cập nhật bài viết theo slug
router.post("/update/post/:slug", async (request, response) => {
  console.log("update thành công");
  try {
    const post = await Post.findOneAndUpdate(
      { slug: request.params.slug },
      request.body
    );
    await post.save();
    response.send(post);
  } catch (error) {
    response.status(500).send({ error });
  }
});

//---------------api xóa bài viết theo slug
router.post("/delete/post/:slug", async (request, response) => {
  console.log(request.params.slug)
  try {
    
    const post = await Post.findOneAndDelete({ slug: request.params.slug });
    if (!post) {
      return response.status(404).send("Post wasn't found");
    }
    response.status(204).json({message:"Xóa thành công"});
  } catch (error) {
    response.status(500).send({ error });
  }
});
module.exports = router;
