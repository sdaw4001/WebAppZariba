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
const pg_1 = require("pg");
const crypto = require("crypto");
class AuthenticationService {
    constructor() {
        this.client = new pg_1.Client({
            host: 'localhost',
            database: 'users',
            port: 5432,
            user: 'casualino',
            password: '123456',
        });
        this.salt = this.genRandomString(16);
        this.error = false;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    ;
    genRandomString(length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    }
    ;
    sha512(password, salt) {
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    }
    ;
    saltHashPassword(userPassword) {
        let saltKey = this.genRandomString(16);
        let passwordData = this.sha512(userPassword, saltKey);
        return {
            salt: saltKey,
            passwordHash: passwordData
        };
    }
    ;
    saltingValidation(password, salt) {
        let hash = crypto.createHmac('sha512', salt);
        let res = hash.update(password);
        let value = res.digest('hex');
        return {
            salt: salt,
            hash: value
        };
    }
    turnErrorOn(value) {
        value = !value;
        return value;
    }
    registerUser(userEmail, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    let result = this.saltHashPassword(userPassword);
                    yield this.client.query('INSERT INTO userinfo (id, email, password, salt) VALUES ($1, $2, $3, $4)', [this.getRandomInt(1, 200000),
                        userEmail,
                        result.passwordHash.passwordHash,
                        result.passwordHash.salt]);
                    console.log("Success registration !");
                }
                catch (err) {
                    console.error(err.message);
                }
            }));
        });
    }
    ;
    validatingWithDB(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    let saltKey = yield this.client.query("SELECT salt FROM userinfo WHERE email=$1", [email]);
                    if (saltKey.rowCount == 1) {
                        let hashedLoginPassword = this.saltingValidation(password, saltKey.rows[0].salt).hash;
                        let result = yield this.client.query('SELECT id FROM userinfo WHERE email=$1 AND password=$2', [email, hashedLoginPassword]);
                        if (result.rowCount > 1 || result.rowCount < 1) {
                            throw Error("Wrong or non existing user !");
                        }
                        else {
                            console.log("Succes Login !");
                        }
                    }
                    else {
                        throw Error("Wrong or non existing user !");
                    }
                }
                catch (err) {
                    console.error(err.message);
                }
            }));
        });
    }
    ;
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=crmControllers.js.map