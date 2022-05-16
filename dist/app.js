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
const express_1 = __importDefault(require("express"));
const db_conn_1 = require("./db_conn");
const joi_1 = __importDefault(require("joi"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
db();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
// App routes
app.get('/list-characters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, db_conn_1.ListCharaters)();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}));
app.post('/characters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        image: joi_1.default.string().required(),
        powers: joi_1.default.array().unique().min(1).max(3).items().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(error));
    }
    const response = yield (0, db_conn_1.CreateCharater)(value);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}));
app.put('/characters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        image: joi_1.default.string().required(),
        powers: joi_1.default.array().unique().min(1).max(3).items().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(error));
    }
    const response = yield (0, db_conn_1.UpdateCharater)(value);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}));
function db() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConnection = yield (0, db_conn_1.ConnectectionCheck)();
        if (dbConnection) {
            console.log('Database Connection was established and closed!');
        }
    });
}
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map