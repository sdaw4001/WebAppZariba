"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crmControllers_1 = require("../controllers/crmControllers");
const types_1 = require("../types");
const pg_1 = require("pg");
const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class Routes {
    constructor() {
        this.authenticationService = new crmControllers_1.AuthenticationService();
        this.client = new pg_1.Client({
            host: 'localhost',
            database: 'users',
            port: 5432,
            user: 'casualino',
            password: '123456',
        });
    }
    routes(app) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        // Login 
        app.route('/login')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect(() => __awaiter(this, void 0, void 0, function* () {
                let saltKey = yield this.client.query("SELECT salt FROM userinfo WHERE email=$1", [req.body.email]);
                try {
                    if (req.body.password.length > 6 &&
                        reg.test(req.body.email) &&
                        saltKey.rowCount > 0) {
                        yield this.authenticationService.validatingWithDB(req.body.email, req.body.password);
                        res.status(200).send(new types_1.Result(true, { Message: 'Login Successfully !' }));
                    }
                    else {
                        res.status(404).send(new types_1.Result(false, { Message: 'Ivalid Login!' }));
                        console.log("Invalid Login!");
                    }
                }
                catch (_a) {
                    res.status(400).send(new types_1.Result(false, { Message: 'Bad request, Please try again' }, types_1.ErrorCodes.BadRequest));
                }
            }));
        }));
        // Sign Up
        app.route('/signup')
            // post - Register
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect(() => __awaiter(this, void 0, void 0, function* () {
                let emailUnique = yield this.client.query("SELECT id FROM userinfo WHERE email=$1", [req.body.email]);
                try {
                    const email = req.body.email;
                    const password = req.body.password;
                    if (reg.test(email) && password.toString().length >= 6) {
                        if (emailUnique.rowCount < 1) {
                            yield this.authenticationService.registerUser(req.body.email, req.body.password);
                            res.status(200).send(new types_1.Result(true, { Message: 'User have been created !' }));
                        }
                        else {
                            console.log("Existing Email! ");
                            throw Error("User with this email already exist !");
                        }
                    }
                    else {
                        console.log("Invalid Registration!");
                        throw Error("Email is not correct or password is not atleast 6 characters long!");
                    }
                }
                catch (err) {
                    res.status(400).send(new types_1.Result(false, { err: err.message }, types_1.ErrorCodes.BadRequest));
                }
            }));
        }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map