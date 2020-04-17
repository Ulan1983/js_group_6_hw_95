import React, {Component} from 'react';
import {deleteCocktail, fetchAllCocktails, fetchCocktails, publishCocktail} from "../../store/actions/cocktailsActions";
import {connect} from "react-redux";
import CocktailList from "../../components/CocktailList/CocktailList";
import ShowTo from "../../hoc/ShowTo";

class Cocktails extends Component {
	async componentDidMount() {
		await this.props.fetchCocktails();
		await this.props.fetchAllCocktails();
	}

	deleteCocktail = async (id) => {
		await this.props.deleteCocktail(id);
		await this.props.fetchCocktails();
		await this.props.fetchAllCocktails();
	};

	publishCocktail = async (id) => {
		await this.props.publishCocktail(id);
		await this.props.fetchCocktails();
		await this.props.fetchAllCocktails();
	};

	render() {
		return (
			<>
				{this.props.cocktails && this.props.cocktails.map(cocktail => {
					let ingredients = '';

					for (let i = 0; i < cocktail.ingredients.length; i++) {
						let ingName = cocktail.ingredients[i].name;
						let ingAmount = cocktail.ingredients[i].amount;

						let ing = ingName + ' ' + ingAmount + ',';
						ingredients += ' ' + ing;
					}

					return (
						cocktail.published ?
						<CocktailList
							key={cocktail._id}
							title={cocktail.title}
							id={cocktail._id}
							image={cocktail.image}
							recipe={cocktail.recipe}
							ingredients={ingredients}
							published={cocktail.published}
							delete={() => this.deleteCocktail(cocktail._id)}
							publish={() => this.publishCocktail(cocktail._id)}
						/> :
							<ShowTo
								role="admin"
								key={cocktail._id}
							>
								<CocktailList
									key={cocktail._id}
									title={cocktail.title}
									id={cocktail._id}
									image={cocktail.image}
									recipe={cocktail.recipe}
									ingredients={ingredients}
									published={cocktail.published}
									delete={() => this.deleteCocktail(cocktail._id)}
									publish={() => this.publishCocktail(cocktail._id)}
								/>
							</ShowTo>
					)
				})}
			</>
		);
	}
}

const mapStateToProps = state => ({
	cocktails: state.cocktails.cocktails,
});

const mapDispatchToProps = dispatch => ({
	fetchCocktails: () => dispatch(fetchCocktails()),
	fetchAllCocktails: () => dispatch(fetchAllCocktails()),
	publishCocktail: id => dispatch(publishCocktail(id)),
	deleteCocktail: id => dispatch(deleteCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);