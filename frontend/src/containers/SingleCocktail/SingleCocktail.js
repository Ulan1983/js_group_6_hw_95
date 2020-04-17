import React, {Component} from 'react';
import {fetchCocktail} from "../../store/actions/cocktailsActions";
import {connect} from "react-redux";
import {Card, CardBody, CardImg, CardText} from "reactstrap";
import {apiURL} from "../../constants";

class SingleCocktail extends Component {
	componentDidMount() {
		this.props.fetchCocktail(this.props.match.params.id);
	}

	render() {
		return (
			<div>
				{this.props.cocktail &&
				<Card>
					<CardBody>
						<CardImg
							src={apiURL + '/uploads/' + this.props.cocktail.image}
							style={{width: '50%', marginBottom: '10px'}}
						/>
						<CardText style={{fontSize: '24px'}}><strong>Title: </strong>{this.props.cocktail.title}</CardText>
						<strong style={{fontSize: '20px'}}>Ingredients: </strong>
						{this.props.cocktail.ingredients && this.props.cocktail.ingredients.map((ing, i) => {
							return (
								<ul key={i} style={{fontSize: '18px', margin: '0'}}>
									<li><strong>{ing.name}: </strong> <span>{ing.amount}</span></li>
								</ul>
							)
						})}
						<CardText style={{fontSize: '18px', marginTop: '10px'}}><strong>Recipe: </strong>{this.props.cocktail.recipe}</CardText>
					</CardBody>
				</Card>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cocktail: state.cocktails.cocktail,
});

const mapDispatchToProps = dispatch => ({
	fetchCocktail: id => dispatch(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleCocktail);