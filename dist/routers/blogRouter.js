"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
//create a router for blog posts
const blogRouter = express_1.default.Router();
//create an endpoint to get all the blog posts
blogRouter.get('/posts', blogController_1.default.getAllBlogPosts);
//create an endpoint to get a specific blog post
blogRouter.get('/posts/:id', blogController_1.default.getSpecificBlogPost);
//create an endpoint to create a blog post
blogRouter.post('/posts', blogController_1.default.createBlogPost);
//create an endpoint to update a specific blog post
blogRouter.put('/posts/:id', blogController_1.default.updateSpecificBlogPost);
//create an endpoint to delete a specific blog post
blogRouter.delete('/posts/:id', blogController_1.default.deleteSpecificBlogPost);
exports.default = blogRouter;
//# sourceMappingURL=blogRouter.js.map