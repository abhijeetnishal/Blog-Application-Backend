"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express to use router method
const express_1 = __importDefault(require("express"));
//express.Router() is a method in the Express.js that creates a new router object.
//It is used to define routes for a specific endpoint.
const schemaRouter = express_1.default.Router();
//import schemas
const schema_1 = __importDefault(require("../models/schema"));
//create an endpoint for creating schemas.
schemaRouter.post('/schema', schema_1.default);
exports.default = schemaRouter;
//# sourceMappingURL=schemaRouter.js.map