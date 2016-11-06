import React, {Component} from 'react';
import {
    Col,
    Row,
    Container,
    Card,
    CardBlock,
    CardTitle,
    Button,
} from 'reactstrap';
import {Link, withRouter} from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


export class SigninView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordInvalid: null,
            emailInvalid: null,
            email: null,
            password: null
        };
    }
    _handleEmailChange(event) {
        const x = event.target.value;
        let atpos = x.indexOf("@");
        let dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            this.setState({emailInvalid: "Invalid email address", email: x});
        } else if (x.length === 0) {
            this.setState({emailInvalid: "Email address required", email: x});
        } else {
            this.setState({emailInvalid: null, email: x});
        }
    }
    _handlePasswordChange() {
        if (this.refs.signupPassword.value.length < 8) {
            this.setState({passwordInvalid: "Password must be 8 or more characters.", password: this.refs.signupPassword.value});
        } else {
            this.setState({passwordInvalid: null, password: this.refs.signupPassword.value});
        }
    }
    _handleSignin() {
        let self = this;
        this.props.signin({email: this.refs.signupEmail.value, password: this.refs.signupPassword.value}).then((res) => {
            const login_user = res.data.login_user;
            localStorage.setItem('login_token', login_user.token);
            localStorage.setItem('login_tokenExpire', login_user.tokenExpire);
            localStorage.setItem('login_id', login_user.id);
            self.props.history.push('/');
        });
    }
    _handleReturn(event) {
        if (event.which === 13) {
            this._handleSignin();
        }
    }
    render() {
        return (
            <Container className="account-form">
                <Row>
                    <Col sm="4" className="offset-sm-4" style={{
                        marginTop: "100px"
                    }}>
                        <Card>
                            <CardBlock>
                                <CardTitle>Login</CardTitle>
                                <div className={`form-group ${ (this.state.emailInvalid
                                    ? "has-danger"
                                    : "")}`}>
                                    <label>Email Address</label>
                                    <input onBlur={this._handleEmailChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="signupEmail" type="text" className="form-control"/> {this.state.emailInvalid
                                        ? <div className="form-control-feedback">{this.state.emailInvalid}</div>
                                        : <span></span>
}
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input onChange={this._handlePasswordChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="signupPassword" type="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <Link to="/forgot">Forgot your password?</Link>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <Button type="submit" onClick={this._handleSignin.bind(this)} disabled={!(this.state.email && this.state.password)} color="secondary">Login</Button>
                                </div>
                            </CardBlock>
                        </Card>
                        <label>Don't have an account?
                            <Link to="/register">Register</Link>
                        </label>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const signInMutation = gql `mutation signin($email: String! $password: String!) {
	login_user(email: $email, password: $password) {
		id,
		token,
		tokenExpire
	}
}`;

export const Signin = withRouter(graphql(signInMutation, {
    props({mutate}) {
        return {
            signin(email, password) {
                return mutate({
                    variables: {
                        email,
												password,
                    }
                })
            }
        }
    }
})(SigninView))

export class ForgotView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            emailInvalid: null
        };
    }
    _handleEmailChange(event) {
        const x = event.target.value;
        let atpos = x.indexOf("@");
        let dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            this.setState({emailInvalid: "Invalid email address", email: x});
        } else if (x.length === 0) {
            this.setState({emailInvalid: "Email address required", email: x});
        } else {
            this.setState({emailInvalid: null, email: x});
        }
    }
    _handleForgot() {
        let self = this;
        this.props.forgot({email: this.refs.forgotEmail.value}).then((res) => {
            const login_user = res.data.register_user;
            localStorage.setItem('login_token', login_user.token);
            localStorage.setItem('login_tokenExpire', login_user.tokenExpire);
            localStorage.setItem('login_id', login_user.id);
            self.props.history.push('/');
        }, (err) => {});
    }
    _handleReturn(event) {
        if (event.which === 13) {
            this._handleForgot();
        }
    }
    render() {
        return (
            <Container className="account-form">
                <Row>
                    <Col sm="4" className="offset-sm-4" style={{
                        marginTop: "100px"
                    }}>
                        <Card>
                            <CardBlock>
                                <CardTitle>Send Reset Password Link</CardTitle>
                                <div className={`form-group ${ (this.state.emailInvalid
                                    ? "has-danger"
                                    : "")}`}>
                                    <label>Email Address</label>
                                    <input onChange={this._handleEmailChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="forgotEmail" type="text" className="form-control"/> {this.state.emailInvalid
                                        ? <div className="form-control-feedback">{this.state.emailInvalid}</div>
                                        : <span></span>
}
                                </div>
                                <div className="form-group">
                                    <Button type="submit" onClick={this._handleForgot.bind(this)} disabled={!(this.state.email) || !!(this.state.emailInvalid)} color="secondary">Send Reset Link</Button>
                                </div>
                            </CardBlock>
                        </Card>
                        <label>Looking to login?
                            <Link to="/login">Login</Link>
                        </label>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const forgotMutation = gql `
mutation forgot($email: String!){
forgot(email: $email){
email,
id
}
}
				`;

export const Forgot = withRouter(graphql(forgotMutation, {
    props({mutate}) {
        return {
            forgot(email) {
                return mutate({
                    variables: {
                        email,
                    }
                })
            }
        }
    }
})(ForgotView))

export class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordInvalid: null,
            emailInvalid: null,
            email: null,
            password: null
        };
    }
    _handleEmailChange(event) {
        const x = event.target.value;
        let atpos = x.indexOf("@");
        let dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            this.setState({emailInvalid: "Invalid email address", email: x});
        } else if (x.length === 0) {
            this.setState({emailInvalid: "Email address required", email: x});
        } else {
            this.setState({emailInvalid: null, email: x});
        }
    }
    _handlePasswordChange(event) {
        if (this.refs.signupPassword.value.length < 8) {
            this.setState({passwordInvalid: "Password must be 8 or more characters.", password: this.refs.signupPassword.value});
        } else if (this.refs.signupPassword.value !== this.refs.signupPasswordRepeat.value) {
            this.setState({passwordInvalid: "Passwords must match.", password: this.refs.signupPassword.value});
        } else {
            this.setState({passwordInvalid: null, password: this.refs.signupPassword.value});
        }
    }
    _handleRegister() {
        let self = this;
        this.props.register({email: this.refs.signupEmail.value, password: this.refs.signupPassword.value}).then((res) => {
            const login_user = res.data.register_user;
            localStorage.setItem('login_token', login_user.token);
            localStorage.setItem('login_tokenExpire', login_user.tokenExpire);
            localStorage.setItem('login_id', login_user.id);
            self.props.history.push('/');
        }, (err) => {});
    }
    _handleReturn(event) {
        if (event.which === 13) {
            this._handleRegister();
        }
    }
    render() {
        return (
            <Container className="account-form">
							<Row>
								<Col sm="4" className="offset-sm-4" style={{
									marginTop: "100px"
								}}>
									<Card>
										<CardBlock>
											<CardTitle>Register</CardTitle>
											<div className={`form-group ${ (this.state.emailInvalid
												? "has-danger"
											: "")}`}>
												<label>Email Address</label>
												<input onBlur={this._handleEmailChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="signupEmail" type="text" className="form-control"/> {this.state.emailInvalid
													? <div className="form-control-feedback">{this.state.emailInvalid}</div>
													: <span></span>
												}
											</div>
											<div className={`form-group ${ (this.state.passwordInvalid
												? "has-danger"
											: "")}`}>
												<label>Password</label>
												<input onBlur={this._handlePasswordChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="signupPassword" type="password" className="form-control"/>
											</div>
											<div className={`form-group ${ (this.state.passwordInvalid
												? "has-danger"
											: "")}`}>
												<label>Repeat</label>
												<input onChange={this._handlePasswordChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="signupPasswordRepeat" name="repeat" type="password" className="form-control"/> {this.state.passwordInvalid
													? <div className="form-control-feedback">{this.state.passwordInvalid}</div>
													: <span></span>
												}
											</div>
											<div className="form-group">
												<Button type="submit" onClick={this._handleRegister.bind(this)} disabled={!(this.state.email && this.state.password) || !!(this.state.passwordInvalid || this.state.emailInvalid)} color="secondary">Register</Button>
											</div>
										</CardBlock>
									</Card>
									<label>Have an account?
										<Link to="/login">Login</Link>
									</label>
								</Col>
							</Row>
            </Container>
        );
    }
}

const RegisterMutation = gql `
mutation register($email: String! $password: String!) {
	register_user(email: $email, password: $password) {
		id,
		token,
		tokenExpire
	}
}
				`;

export const Register = withRouter(graphql(RegisterMutation, {
    props({mutate}) {
        return {
            register(email, password) {
                return mutate({
                    variables: {
                        email,
                        password
                    }
                })
            }
        }
    }
})(RegisterView))

export class PasswordResetView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordInvalid: null,
            emailInvalid: null,
            email: null,
            password: null,
            resetLink: props.params.resetLink
        };
    }
    _handlePasswordChange(event) {
        if (this.refs.signupPassword.value.length < 8) {
            this.setState({passwordInvalid: "Password must be 8 or more characters.", password: this.refs.signupPassword.value});
        } else if (this.refs.signupPassword.value !== this.refs.signupPasswordRepeat.value) {
            this.setState({passwordInvalid: "Passwords must match.", password: this.refs.signupPassword.value});
        } else {
            this.setState({passwordInvalid: null, password: this.refs.signupPassword.value});
        }
    }
    _handleReset() {
        let self = this;
        debugger;
        this.props.reset({resetLink: this.state.resetLink, password: this.refs.signupPassword.value}).then((res) => {
            const login_user = res.data.reset;
            localStorage.setItem('login_token', login_user.token);
            localStorage.setItem('login_tokenExpire', login_user.tokenExpire);
            localStorage.setItem('login_id', login_user.id);
            self.props.history.push('/');
        }, (err) => {});
    }
    _handleReturn(event) {
        if (event.which === 13) {
            this._handleReset();
        }
    }
    render() {
        return (
            <Container className="account-form">
                <Row>
                    <Col sm="4" className="offset-sm-4" style={{
                        marginTop: "100px"
                    }}>
                        <Card>
                            <CardBlock>
                                <CardTitle>Reset Password</CardTitle>
                                <div className={`form-group ${ (this.state.passwordInvalid
                                    ? "has-danger"
                                    : "")}`}>
                                    <label>Password</label>
                                    <input onBlur={this._handlePasswordChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="signupPassword" type="password" className="form-control"/>
                                </div>
                                <div className={`form-group ${ (this.state.passwordInvalid
                                    ? "has-danger"
                                    : "")}`}>
                                    <label>Repeat</label>
                                    <input onChange={this._handlePasswordChange.bind(this)} onKeyDown={this._handleReturn.bind(this)} ref="signupPasswordRepeat" name="repeat" type="password" className="form-control"/> {this.state.passwordInvalid
                                        ? <div className="form-control-feedback">{this.state.passwordInvalid}</div>
                                        : <span></span>
}
                                </div>
                                <div className="form-group">
                                    <Button type="submit" onClick={this._handleReset.bind(this)} disabled={!(this.state.password) || !!(this.state.passwordInvalid)} color="secondary">Reset Password</Button>
                                </div>
                            </CardBlock>
                        </Card>
                        <label>Remember your password?
                            <Link to="/login">Login</Link>
                        </label>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const ResetMutation = gql `
				mutation reset($resetLink: String! $password: String!) {
					reset(resetLink: $resetLink, password: $password) {
						token,
						tokenExpire,
					}
				}
				`;

export const PasswordReset = withRouter(graphql(ResetMutation, {
    props({mutate}) {
        return {
            reset(resetLink, password) {
                return mutate({
                    variables: {
                        resetLink,
                        password
                    }
                })
            }
        }
    }
})(PasswordResetView))
