import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import {loginUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import FormElement from "../../components/UI/Form/FormElement";

class Login extends Component {
	state = {
		username: '',
		password: ''
	};

	inputChangeHandler = event => {
		this.setState({[event.target.name]: event.target.value});
	};

	submitFormHandler = event => {
		event.preventDefault();
		this.props.loginUser({...this.state});
	};

	render() {
		return (
			<div>
				<h2>Login</h2>
				{this.props.error && (
					<Alert color="danger">{this.props.error.error}</Alert>
				)}
				<FacebookLogin />

				{/*<Form onSubmit={this.submitFormHandler}>*/}
				{/*	<FormElement*/}
				{/*		propertyName="username"*/}
				{/*		title="Username"*/}
				{/*		value={this.state.username}*/}
				{/*		onChange={this.inputChangeHandler}*/}
				{/*		type="text"*/}
				{/*		autoComplete="current-username"*/}
				{/*		placeholder="Enter username"*/}
				{/*	/>*/}
				{/*	<FormElement*/}
				{/*		propertyName="password"*/}
				{/*		title="Password"*/}
				{/*		value={this.state.password}*/}
				{/*		onChange={this.inputChangeHandler}*/}
				{/*		type="password"*/}
				{/*		autoComplete="current-password"*/}
				{/*		placeholder="Enter password"*/}
				{/*	/>*/}
				{/*	<FormGroup row>*/}
				{/*		<Col sm={{offset: 2, size: 10}}>*/}
				{/*			<Button type="submit" color="primary">*/}
				{/*				Login*/}
				{/*			</Button>*/}
				{/*		</Col>*/}
				{/*	</FormGroup>*/}
				{/*</Form>*/}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.users.loginLoading,
	error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
	loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);