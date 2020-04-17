import React, {Component} from 'react';
import {createCocktail} from "../../store/actions/cocktailsActions";
import {connect} from "react-redux";
import CocktailForm from "../../components/UI/Form/CocktailForm";

class NewCocktail extends Component {
	createCocktail = formData => {
		this.props.createCocktail(formData);
	};

	render() {
		return (
			<>
				<CocktailForm
					onSubmit={this.createCocktail}
				/>
			</>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	createCocktail: cocktailData => dispatch(createCocktail(cocktailData)),
});

export default connect(null, mapDispatchToProps)(NewCocktail);