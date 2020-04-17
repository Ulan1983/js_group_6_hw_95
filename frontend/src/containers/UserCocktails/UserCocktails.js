import React, {Component} from 'react';
import {
	deleteCocktail,
	fetchAllCocktails,
	fetchUserCocktails,
	publishCocktail
} from "../../store/actions/cocktailsActions";
import {connect} from "react-redux";
import CocktailList from "../../components/CocktailList/CocktailList";

class UserCocktails extends Component {
	async componentDidMount() {
		await this.props.fetchUserCocktails();
		await this.props.fetchAllCocktails();
	}

	deleteCocktail = async (id) => {
		await this.props.deleteCocktail(id);
		await this.props.fetchUserCocktails();
		await this.props.fetchAllCocktails();
	};

	publishCocktail = async (id) => {
		await this.props.publishCocktail(id);
		await this.props.fetchUserCocktails();
		await this.props.fetchAllCocktails();
	};

	render() {
		return (
			<>
				<h4>My cocktails</h4>
				{this.props.userCocktails && this.props.userCocktails.map(cocktail => {
					let ingredients = '';

					for (let i = 0; i < cocktail.ingredients.length; i++) {
						let ingName = cocktail.ingredients[i].name;
						let ingAmount = cocktail.ingredients[i].amount;

						let ing = ingName + ' ' + ingAmount + ',';
						ingredients += ' ' + ing;
					}
					return (
						<div
							key={cocktail._id}>
							<CocktailList
								title={cocktail.title}
								id={cocktail._id}
								image={cocktail.image}
								recipe={cocktail.recipe}
								ingredients={ingredients}
								published={cocktail.published}
								delete={() => this.deleteCocktail(cocktail._id)}
								publish={() => this.publishCocktail(cocktail._id)}
							/>
						</div>
					)
				})}
			</>
		);
	}
}

const mapStateToProps = state => ({
	userCocktails: state.cocktails.userCocktails,
});

const mapDispatchToProps = dispatch => ({
	fetchUserCocktails: () => dispatch(fetchUserCocktails()),
	fetchAllCocktails: () => dispatch(fetchAllCocktails()),
	publishCocktail: id => dispatch(publishCocktail(id)),
	deleteCocktail: id => dispatch(deleteCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCocktails);