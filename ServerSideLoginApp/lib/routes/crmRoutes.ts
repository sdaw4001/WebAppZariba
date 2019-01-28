import { Request, Response } from "express";
import { AuthenticationService } from "../controllers/crmControllers";
import { Result, ErrorCodes } from "../types";
import { Client } from 'pg';

const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export class Routes {

    public authenticationService: AuthenticationService = new AuthenticationService();

    client = new Client({
        host: 'localhost',
        database: 'users',
        port: 5432,
        user: 'casualino',
        password: '123456',
    });

    public routes(app): void {

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
        // Login 
        app.route('/login')
            .post(async (req: Request, res: Response) => {
                await this.client.connect(async () => {
                    let saltKey = await this.client.query(
                        "SELECT salt FROM userinfo WHERE email=$1", [req.body.email]);
                    try {
                        if (req.body.password.length > 6 &&
                            reg.test(req.body.email) &&
                            saltKey.rowCount > 0) {

                            await this.authenticationService.validatingWithDB(
                                req.body.email,
                                req.body.password
                            );

                            res.status(200).send(new Result(
                                true, { Message: 'Login Successfully !' }
                            ));

                        } else {
                            res.status(404).send(new Result(
                                false, { Message: 'Ivalid Login!' }
                            ));
                            console.log("Invalid Login!");

                        }
                    } catch {
                        res.status(400).send(new Result(
                            false, { Message: 'Bad request, Please try again' }, ErrorCodes.BadRequest
                        ));
                    }
                });
            })

        // Sign Up
        app.route('/signup')
            // post - Register
            .post(async (req: Request, res: Response) => {
                await this.client.connect(async () => {
                    let emailUnique = await this.client.query(
                        "SELECT id FROM userinfo WHERE email=$1", [req.body.email]
                    )
                    try {
                        const email = req.body.email;
                        const password = req.body.password;

                        if (reg.test(email) && password.toString().length >= 6) {
                            if (emailUnique.rowCount < 1) {
                                await this.authenticationService.registerUser(req.body.email, req.body.password);
                                res.status(200).send(new Result(
                                    true, { Message: 'User have been created !' }
                                ));
                            } else {
                                console.log("Existing Email! ")
                                throw Error("User with this email already exist !")
                            }
                        } else {
                            console.log("Invalid Registration!")
                            throw Error("Email is not correct or password is not atleast 6 characters long!")
                        }
                    } catch (err) {
                        res.status(400).send(new Result(
                            false, { err: err.message }, ErrorCodes.BadRequest
                        ));
                    }

                })
            })

    }
}