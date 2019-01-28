import { Client } from "pg";
import * as crypto from "crypto";


export class AuthenticationService {

    client = new Client({
        host: 'localhost',
        database: 'users',
        port: 5432,
        user: 'casualino',
        password: '123456',
    });

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    genRandomString(length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    };

    sha512(password, salt) {
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        let value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    };

    salt = this.genRandomString(16);

    saltHashPassword(userPassword) {
        let saltKey = this.genRandomString(16);
        let passwordData = this.sha512(userPassword, saltKey);
        return {
            salt: saltKey,
            passwordHash: passwordData
        }
    };

    saltingValidation(password, salt) {
        let hash = crypto.createHmac('sha512', salt);
        let res = hash.update(password);
        let value = res.digest('hex');
        return {
            salt: salt,
            hash: value
        };
    }

    turnErrorOn(value){
        value = !value;
        return value;
    }
    error:boolean = false;

    async registerUser(userEmail: string, userPassword: string) {
        await this.client.connect(async () => {
            try {
                let result = this.saltHashPassword(userPassword);
                await this.client.query(
                    'INSERT INTO userinfo (id, email, password, salt) VALUES ($1, $2, $3, $4)',
                    [this.getRandomInt(1, 200000),
                        userEmail,
                    result.passwordHash.passwordHash,
                    result.passwordHash.salt]
                );
                console.log("Success registration !");
            } catch (err) {
                console.error(err.message);

            }
        })
    };

    async validatingWithDB(email: string, password: string) {
        await this.client.connect(async () => {
            try {
                let saltKey = await this.client.query(
                    "SELECT salt FROM userinfo WHERE email=$1", [email]);

                if (saltKey.rowCount == 1) {
                    let hashedLoginPassword = this.saltingValidation(password, saltKey.rows[0].salt).hash;

                    let result = await this.client.query(
                        'SELECT id FROM userinfo WHERE email=$1 AND password=$2', [email, hashedLoginPassword]);

                    if (result.rowCount > 1 || result.rowCount < 1) {
                       throw Error("Wrong or non existing user !");
                    } else {
                        console.log("Succes Login !");
                    }
                } else {
                    throw Error("Wrong or non existing user !");
                }
            } catch (err) {
                console.error(err.message);
            }
        });
    };
}