"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
// import Art from './handlers/gallery';
var galleryRoute_1 = __importDefault(require("./handlers/galleryRoute"));
var userRoute_1 = __importDefault(require("./handlers/userRoute"));
var orderRoute_1 = __importDefault(require("./handlers/orderRoute"));
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
// const corsOption = {
//     origin:'some url',
//     optionsSuccessStatus:200
// }
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// use instance of app to be able to use gallery and user routes
(0, galleryRoute_1.default)(app);
(0, userRoute_1.default)(app);
(0, orderRoute_1.default)(app);
app.get('/', function (_req, res) {
    res.send('Hello Artist!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
