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
const createSchemas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Connect to the PostgreSQL server
        postgresConnect_1.default.connect;
        // Create the schemas
        yield postgresConnect_1.default.client.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            
            CREATE TABLE IF NOT EXISTS blog_post (
                _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                author VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                image_url TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            )
            `);
        res.status(200).json('Schemas created successfully!');
    }
    catch (error) {
        console.error('error creating schemas:', error);
        res.status(500).json('internal server error');
    }
});
exports.default = createSchemas;
//# sourceMappingURL=schema.js.map