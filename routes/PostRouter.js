const express = require("express");
const Post = require("../db/postModel");
const User = require("../db/userModel");
const routerPost = express.Router();

//-------------------api tạo mới bài viết
routerPost.post("/newPost", async (request, response) => {
  const post = new Post(request.body);
  console.log("Request to /api/post", request.body);
  try {
    await post.save();
    response.json(post);
  } catch (error) {
    response.status(500).send(error);
  }
});

//------------------ api lấy tất cả bài viết
routerPost.get("/getAll", async (request, response) => {
  try {
    const posts = await Post.find({});
    response.send(posts);
  } catch (error) {
    response.status(500).send({ error });
  }
});

//------------------api lấy bài viết theo ID
routerPost.get("/:slug", async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug });
    response.send(post);
  } catch (error) {
    response.status(500).send({ error });
  }
});

//-----------------api cập nhật bài viết theo slug
routerPost.post("/update/:slug", async (request, response) => {
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
routerPost.post("/delete/:slug", async (request, response) => {
  console.log(request.params.slug);
  try {
    const post = await Post.findOneAndDelete({ slug: request.params.slug });
    if (!post) {
      return response.status(404).send("Post wasn't found");
    }
    response.status(204).json({ message: "Xóa thành công" });
  } catch (error) {
    response.status(500).send({ error });
  }
});
module.exports = routerPost;
