"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const blogRouter_1 = __importDefault(require("./routers/blogRouter"));
const schemaRouter_1 = __importDefault(require("./routers/schemaRouter"));
//configure env
dotenv_1.default.config();
//create an express instance
const app = (0, express_1.default)();
//To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.
app.use(express_1.default.json());
//The cookie-parser middleware is used to parse cookies from incoming requests, making them available in the req.cookies object.
app.use((0, cookie_parser_1.default)());
//Define port
const port = process.env.PORT || 8080;
//This will allow the user in the frontend to consume the APIs that you have created without any problem.
app.use((0, cors_1.default)({ credentials: true, origin: ['http://localhost:3000'] }));
//schema router - hit this endpoint once to create schemas
app.use(schemaRouter_1.default);
//blog router
app.use(blogRouter_1.default);
//get request when server is live
app.get('/', (req, res) => {
    res.status(200).json('Server is Live');
});
app.listen(port, () => {
    console.log('Server listening at port ' + port);
});
//# sourceMappingURL=index.js.map