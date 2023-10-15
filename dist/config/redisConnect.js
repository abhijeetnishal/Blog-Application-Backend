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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
// Create a Redis instance to connect redis
const redisConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    //create client using upstash Redis URL
    const client = (0, redis_1.createClient)({
        url: process.env.Redis_URL
    });
    //check for error
    client.on("error", function (err) {
        console.log(err);
    });
    //connect to Redis
    yield client.connect();
    //console.log('Redis connected successfully');
    //return client to set and get the cache value
    return client;
});
exports.default = redisConnect;
//# sourceMappingURL=redisConnect.js.map