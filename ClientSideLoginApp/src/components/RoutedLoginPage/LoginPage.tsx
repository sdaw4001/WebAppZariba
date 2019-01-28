// import * as React from 'react';
// import './loginpage.css';
// import { Redirect } from "react-router-dom";
// import axios from 'axios';

// interface IState {
//   showPopup: boolean;
//   email: string;
//   password: string;
//   isValid: boolean;
// }

// class LoginPage extends React.Component<any, IState> {

//   public handleEmailChange = (event: any) => {
//     this.setState({ email: event.target.value }); // Handles the change in Email Field 
//   }

//   public handlePasswordChange = (event: any) => {
//     this.setState({ password: event.target.value }); // Handles the change in Password Field
//   }

//   public onFormSubmit = (e: any) => { // onSubmit method, that does Validation
//     e.preventDefault();
//         // this.successLogin();
//         // this.ValidLogin();
//         // this.props.callbackForParent(this.setState({isValid: true})); // Send callback to Parent to close the Popup
//         const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//         const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

//         if (emailRegEx.test(this.state.email) &&
//             passwordRegEx.test(this.state.password) &&
//             this.state.password.length >= 6) {

//             axios
//                 .post('http://localhost:4999/login', {
//                     email: this.state.email,
//                     password: this.state.password,
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded'
//                     }
//                 })
//                 .then((response) => {
//                     console.log(response.statusText + response.data);

//                     this.successLogin();
//                     this.ValidLogin();
//                 })
//                 .catch(function (err) {
//                     alert(err)
//                 });
//         } else {
//             alert("Sorry Cant register you :( !")
//         }
//   }

//   ValidLogin = () => {  // Store if the Login is successfully
//     this.setState({
//       isValid: !this.state.isValid,
//     });
//   }

//   successLogin = () => { // Method for closing the PopUp
//     this.setState({
//       showPopup: !this.state.showPopup,
//     });
//   }

//   togglePopup() {   // Method toggle the popup
//     this.setState({
//       showPopup: !this.state.showPopup,
//     });
//   }

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       showPopup: false,
//       email: '',
//       password: '',
//       isValid: false
//     }
//   }


//   public render() {
//     return (
//       <div className="app-whole">
//         <div className="header-login">
//           {
//             this.state.isValid ? (
//               <Redirect to="/landing-page" />
//             ) : (
//                 <button className="button-login"
//                   onClick={this.togglePopup.bind(this)}>Влез</button>
//               )
//           }
//         </div>
//         <div className="app-login-popup">
//           {this.state.showPopup ?
//             (
//               <form onSubmit={this.onFormSubmit}>
//                 <div>
//                   <label className="title-login">ВХОД</label>
//                   <button type="button"
//                     onClick={this.togglePopup.bind(this)}
//                     className="login-form-close-btn"></button>
//                 </div>
//                 <div className="banner-login-form">
//                   <label />
//                 </div>
//                 <div className="login-form">

//                   <input
//                     className="textfield-login-email"
//                     value={this.state.email}
//                     onChange={this.handleEmailChange}
//                     placeholder="  Email"
//                     name='email'
//                     id='email-id'
//                   />

//                   <br />

//                   <input
//                     className="textfield-login-password"
//                     value={this.state.password}
//                     onChange={this.handlePasswordChange}
//                     placeholder="  Password"
//                     name='pwd'
//                     id='password-id'
//                     type="password"
//                   />

//                   <br />

//                   <button
//                     type='submit'
//                     className="button-in-loginform">
//                     ВЛЕЗ
//                 </button>
//                 </div>
//               </form>
//             ) : (null)
//           }
//         </div>
//       </div>
//     );
//   }
// }

// export default LoginPage;
