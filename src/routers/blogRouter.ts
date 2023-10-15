import express from "express";
import blogController from "../controllers/blogController";

//create a router for blog posts
const blogRouter = express.Router();

//create an endpoint to get all the blog posts
blogRouter.get('/posts', blogController.getAllBlogPosts);

//create an endpoint to get a specific blog post
blogRouter.get('/posts/:id', blogController.getSpecificBlogPost);

//create an endpoint to create a blog post
blogRouter.post('/posts', blogController.createBlogPost);

//create an endpoint to update a specific blog post
blogRouter.put('/posts/:id', blogController.updateSpecificBlogPost);

//create an endpoint to delete a specific blog post
blogRouter.delete('/posts/:id', blogController.deleteSpecificBlogPost);

export default blogRouter;