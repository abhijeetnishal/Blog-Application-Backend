"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresConnect_1 = __importDefault(require("../config/postgresConnect"));
const redisConnect_1 = __importDefault(require("../config/redisConnect"));
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get query params
        const { sort, category } = req.query;
        //get sorted/filtered data
        if (sort && category) {
            //query data according to category and sorting filter
            let queury = `SELECT * FROM blog_post WHERE category = '${category}'`;
            queury += ` ORDER BY ` + sort;
            //get details of blog post 
            const { rows } = yield postgresConnect_1.default.client.query(queury);
            //check if data exists or not
            if (rows.length === 0)
                res.status(404).json('post not found');
            else {
                return res.status(200).json(rows);
            }
        }
        //get req ip address
        const ipAddress = req.ip;
        //set limit
        const limit = 3;
        //get redis client from redisConnect.ts file
        const client = yield (0, redisConnect_1.default)();
        //check if value is present in Redis or not
        const userCountDetail = yield client.get(ipAddress);
        //if value is present(cache hit)
        if (userCountDetail) {
            //parse the value from string to number
            const currentCount = JSON.parse(userCountDetail);
            if (currentCount >= limit) {
                //(429) too many requests
                return res.status(429).json({ message: 'Rate Limit Exceeded. Please try again later.' });
            }
            else {
                //update the count in Redis(key, value) without affecting time with KEEPTTL option
                yield client.set(ipAddress, JSON.stringify(currentCount + 1), {
                    KEEPTTL: true
                });
                //get data from DB
                const { rows } = yield postgresConnect_1.default.client.query(`SELECT * FROM blog_post`);
                //check if data exists or not
                if (rows.length === 0)
                    return res.status(404).json('no blog posts are created');
                else {
                    //return the data
                    return res.status(200).json(rows);
                }
            }
        }
        //if value is not present(cache miss)
        else {
            //get data from DB
            const { rows } = yield postgresConnect_1.default.client.query(`SELECT * FROM blog_post`);
            //check if data exists or not
            if (rows.length === 0)
                return res.status(404).json('no blog posts are created');
            else {
                const count = 1;
                //store the data in Redis(key, value) with options
                yield client.set(ipAddress, JSON.stringify(count), {
                    //set expiration time
                    EX: 40,
                    //not exist
                    NX: true
                });
                //return the data
                return res.status(200).json(rows);
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error\n" + error });
    }
});
const getSpecificBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get post Id from params
        const blogPostId = req.params.id;
        //get details of blog post
        const { rows } = yield postgresConnect_1.default.client.query(`SELECT * FROM blog_post WHERE _id = $1`, [blogPostId]);
        //check if data exists or not
        if (rows.length === 0)
            res.status(404).json('post not found');
        else {
            //extract data from list
            const blogPostData = rows[0];
            return res.status(200).json(blogPostData);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal Server Error" });
    }
});
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get data from client
        const { author, name, category, content, image_url } = req.body;
        if (!author || !category || !content) {
            //Bad request (400)
            res.status(400).json('enter all required data');
        }
        else {
            //insert blog post data into DB
            yield postgresConnect_1.default.client.query(`INSERT INTO blog_post(author, name, category, content, image_url) 
                    VALUES($1, $2, $3, $4, $5)`, [author, name, category, content, image_url]);
            //get client from redisConnect.ts file
            const client = yield (0, redisConnect_1.default)();
            //invalidate cache
            client.del('cached_data');
            res.status(201).json('blog post created');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error\n" + error });
    }
});
const updateSpecificBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get post Id from params
        const blogPostId = req.params.id;
        //get data from client
        const { author, name, category, content, image_url } = req.body;
        //get post data using post id
        const { rows } = yield postgresConnect_1.default.client.query(`SELECT * FROM blog_post WHERE _id = $1`, [blogPostId]);
        if (rows.length === 0) {
            res.status(404).json('post not found');
        }
        else {
            //extract the current values from the query result
            const currentValues = rows[0];
            //update post
            yield postgresConnect_1.default.client.query(`UPDATE blog_post 
                SET author = COALESCE($1, author), 
                    name = COALESCE($2, name), 
                    category = COALESCE($3, category), 
                    content = COALESCE($4, content), 
                    image_url = COALESCE($5, image_url) 
                WHERE _id = $6`, [author || currentValues.author, name || currentValues.name, category || currentValues.category, content || currentValues.content, image_url || currentValues.image_url, blogPostId]);
            //get client from redisConnect.ts file
            const client = yield (0, redisConnect_1.default)();
            //invalidate cache
            client.del('cached_data');
            res.status(200).json('post updated with id:' + blogPostId);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error\n" + error });
    }
});
const deleteSpecificBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get post Id from params
    const blogPostId = req.params.id;
    try {
        //get post data using post id
        const { rows } = yield postgresConnect_1.default.client.query(`SELECT * FROM blog_post WHERE _id = $1`, [blogPostId]);
        if (rows.length === 0) {
            res.status(404).json('post not found');
        }
        else {
            //delete post
            yield postgresConnect_1.default.client.query(`DELETE FROM blog_post WHERE _id = $1`, [blogPostId]);
            //get client from redisConnect.ts file
            const client = yield (0, redisConnect_1.default)();
            //invalidate cache
            client.del('cached_data');
            res.status(200).json('post deleted with id: ' + blogPostId);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error\n" + error });
    }
});
exports.default = {
    getAllBlogPosts,
    getSpecificBlogPost,
    createBlogPost,
    updateSpecificBlogPost,
    deleteSpecificBlogPost
};
//# sourceMappingURL=blogController.js.map