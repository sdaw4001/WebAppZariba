import * as React from 'react';
import './registerloginpage.css';
import { Redirect } from "react-router-dom";
import axios from 'axios';

interface IState {
    shownPopup: boolean;
    formSwitch: boolean;

    emailLogin: string;
    passwordLogin: string;
    isValidLogin: boolean;

    emailRegister: string;
    passwordRegister: string;
    rePasswordRegister: string;
    isValidRegister: boolean;
}

class LoginRegisterPage extends React.Component<any, IState> {


    // Handles the change in Email Field for Login
    public handleEmailChange = (event: any) => {
        this.setState({ emailLogin: event.target.value });
    }

    // Handles the change in Password Field for Login
    public handlePasswordChange = (event: any) => {
        this.setState({ passwordLogin: event.target.value });
    }

    // Handles the change in Password Field for Register
    public handleEmailChangeRegister = (event: any) => {
        this.setState({ emailRegister: event.target.value });
    }
    // Handles the change in Password Field for Register
    public handlePasswordChangeRegister = (event: any) => {
        this.setState({ passwordRegister: event.target.value });
    }
    // Handles the change in ReEnter Password Field for Register
    public handleRePasswordChangeRegister = (event: any) => {
        this.setState({ rePasswordRegister: event.target.value }); // Handles the change in RePassword Field
    }

    // onSubmit method, that does Validation for Login
    // also if its login send post request to the Back-End For Login
    public onFormSubmitLogin = (e: any) => {
        e.preventDefault();
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

        if (emailRegEx.test(this.state.emailLogin) &&
            passwordRegEx.test(this.state.passwordLogin) &&
            this.state.passwordLogin.length >= 6) {

            axios
                .post('http://localhost:4999/login', {
                    email: this.state.emailLogin,
                    password: this.state.passwordLogin,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    console.log(response.statusText + response.data);
                    this.togglePopup();
                    this.validLogin();
                })
                .catch(function (err) {
                    alert(err)
                });
        } else {
            alert("Sorry Cant register you :( !")
        }
    }

    // onSubmit method, that does Validation
    public onFormSubmitRegister = (e: any) => {
        e.preventDefault();

        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

        if (emailRegEx.test(this.state.emailRegister) &&
            passwordRegEx.test(this.state.passwordRegister) &&
            this.state.passwordRegister.length >= 6 &&
            this.state.passwordRegister === this.state.rePasswordRegister) {

            axios
                .post('http://localhost:4999/signup', {
                    email: this.state.emailRegister,
                    password: this.state.passwordRegister,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.bannerSwitcher();
                })
                .catch(function (err) {
                    alert(err)
                });

        } else {
            alert("Sorry Cant register you :( !")
        }
    }

    // Store answer for successfull login
    validLogin = () => {
        this.setState({
            isValidLogin: !this.state.isValidLogin,
        });
    }

    // Method toggle the popup
    togglePopup = () => {
        this.setState({
            shownPopup: !this.state.shownPopup,
        });
    }

    bannerSwitcher = () => {
        this.setState({
            formSwitch: !this.state.formSwitch,
        });
    }

    constructor(props: any) {
        super(props);
        this.state = {
            shownPopup: false,
            formSwitch: true,

            //Login states
            emailLogin: '',
            passwordLogin: '',
            isValidLogin: false,

            //Register states
            emailRegister: '',
            passwordRegister: '',
            rePasswordRegister: '',
            isValidRegister: false
        }
    }


    public render() {
        return (
            <div className="app-whole">
                <div className="header-login">
                    {
                        this.state.isValidLogin ? (
                            <Redirect to="/landing-page" />
                        ) : (
                                <button className="button-login"
                                    onClick={this.togglePopup.bind(this)}>
                                    Влез</button>
                            )
                    }
                </div>
                <div>
                    {   // Show PopUp Switcher
                        this.state.shownPopup ? (
                            <div className="login-form">
                                {
                                    this.state.formSwitch ? (
                                        <div>
                                            <label className="title-login">ВХОД</label>
                                            <button type="button"
                                                onClick={this.togglePopup.bind(this)}
                                                className="login-form-login-close-btn"></button>

                                            <div className="banner-login">
                                                <button type="button"
                                                    onClick={this.bannerSwitcher.bind(this)}
                                                    className="btn-switch-login"></button>
                                            </div>
                                        </div>
                                    ) : (
                                            <div>
                                                <label className="title-register">РЕГИСТРАЦИЯ</label>
                                                <button type="button"
                                                    onClick={this.togglePopup.bind(this)}
                                                    className="login-form-register-close-btn"></button>

                                                <div className="banner-login">
                                                    <button type="button"
                                                        onClick={this.bannerSwitcher.bind(this)}
                                                        className="btn-switch-register"></button>
                                                </div>
                                            </div>
                                        )
                                }
                                <div>
                                    {/* <div className="banner-login">
                                        <button type="button"
                                            onClick={this.bannerSwitcher.bind(this)}
                                            className="btn-switch-login"></button>
                                    </div> */}
                                    { // Login/Register Switcher
                                        this.state.formSwitch ? (
                                            <form onSubmit={this.onFormSubmitLogin}>
                                                <div className="login-fo" >
                                                    <input
                                                        className="textfield-login-email"
                                                        value={this.state.emailLogin}
                                                        onChange={this.handleEmailChange}
                                                        placeholder="  Email"
                                                        name='email'
                                                        id='email-id' />
                                                    <br />
                                                    <input
                                                        className="textfield-login-password"
                                                        value={this.state.passwordLogin}
                                                        onChange={this.handlePasswordChange}
                                                        placeholder="  Password"
                                                        name='pwd'
                                                        id='password-id'
                                                        type="password" />
                                                    <br />
                                                    <button
                                                        type='submit'
                                                        className="button-in-loginform-login">
                                                        ВЛЕЗ</button>
                                                </div>
                                            </form>
                                        ) : (
                                                <form onSubmit={this.onFormSubmitRegister}>
                                                    <div className="login-fo">
                                                        <input
                                                            className="textfield-login-email"
                                                            value={this.state.emailRegister}
                                                            onChange={this.handleEmailChangeRegister}
                                                            placeholder="  Email"
                                                            name='email'
                                                            id='email-id' />
                                                        <br />
                                                        <input
                                                            className="textfield-login-password"
                                                            value={this.state.passwordRegister}
                                                            onChange={this.handlePasswordChangeRegister}
                                                            placeholder="  Password"
                                                            name='pwd'
                                                            id='password-id'
                                                            type="password" />
                                                        <input
                                                            className="textfield-login-password"
                                                            value={this.state.rePasswordRegister}
                                                            onChange={this.handleRePasswordChangeRegister}
                                                            placeholder="  Repeat Password"
                                                            name='pwd'
                                                            id='repassword-id'
                                                            type="password" />
                                                        <br />
                                                        <button
                                                            type='submit'
                                                            className="button-in-loginform-register">
                                                            Регистрирай се !</button>
                                                    </div>
                                                </form>
                                            )
                                    }
                                </div>
                            </div>
                        ) : (
                                null
                            )
                    }
                </div>
            </div>

        );
    }
}

export default LoginRegisterPage;
