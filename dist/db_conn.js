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
exports.UpdateCharater = exports.CreateCharater = exports.ListCharaters = exports.ConnectectionCheck = void 0;
const mongodb_1 = require("mongodb");
const uri = "mongodb://localhost:27017/Wyzebot";
function ConnectectionCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            const response = yield client.db('admin').command({ ping: 1 });
            if (response.ok === 1) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            yield client.close();
        }
    });
}
exports.ConnectectionCheck = ConnectectionCheck;
function ListCharaters() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            const response = yield client.db('Wyzebot').collection('characters').find().toArray();
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            yield client.close();
        }
    });
}
exports.ListCharaters = ListCharaters;
function CreateCharater(reqBody) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            const response = yield client.db('Wyzebot').collection('characters').updateOne({ name: reqBody.name }, { $set: reqBody }, { upsert: true });
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            yield client.close();
        }
    });
}
exports.CreateCharater = CreateCharater;
function UpdateCharater(reqBody) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            const response = yield client.db('Wyzebot').collection('characters').findOneAndUpdate({ _id: new mongodb_1.ObjectId(reqBody.id) }, {
                $set: {
                    name: reqBody.name,
                    image: reqBody.image,
                    powers: reqBody.powers
                }
            }, { upsert: true });
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            yield client.close();
        }
    });
}
exports.UpdateCharater = UpdateCharater;
//# sourceMappingURL=db_conn.js.map