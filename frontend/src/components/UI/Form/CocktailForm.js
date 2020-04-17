import React, {Component} from 'react';
import {Button, Form} from "reactstrap";
import FormElement from "./FormElement";

class CocktailForm extends Component {
	state = {
		title: '',
		image: '',
		ingredients: [
			{name: '', amount: ''}
		],
		recipe: ''
	};

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		Object.keys(this.state).forEach(key => {
			let value;

			if (key === 'ingredients') {
				value = JSON.stringify(this.state[key]);
			} else {
				value = this.state[key];
			}

			formData.append(key, value);
		});

		this.props.onSubmit(formData);
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	fileChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.files[0]
		})
	};

	addIngredient = () => {
		const newIngredients = {name: '', amount: ''};
		this.setState(prevState => ({
			...this.state.ingredients,
			ingredients: prevState.ingredients.concat([newIngredients])
		}));
	};

	changeIngredient = (i, key, event) => {
		const ingCopy = {...this.state.ingredients[i]};
		ingCopy[key] = event.target.value;
		const ingsCopy = [...this.state.ingredients];
		ingsCopy[i] = ingCopy;
		this.setState({ingredients: ingsCopy});
	};


	render() {
		return (
			<>
				<Form onSubmit={this.submitFormHandler}>
					<FormElement
						required
						type="text"
						propertyName="title"
						title="Title"
						placeholder="Enter cocktail title"
						onChange={this.inputChangeHandler}
						value={this.state.title}
					/>

					<FormElement
						type="file"
						propertyName="image" title="Image"
						onChange={this.fileChangeHandler}
					/>

					{this.state.ingredients.map((ing, i) => (
						<div key={i}>
							<FormElement
								type="text"
								propertyName="name"
								title="Ingredient name"
								placeholder="Enter ingredient name"
								onChange={event => this.changeIngredient(i, 'name', event)}
								value={ing.name}
							/>

							<FormElement
								type="text"
								propertyName="amount"
								title="Amount"
								placeholder="Enter ingredient amount"
								onChange={event => this.changeIngredient(i, 'amount', event)}
								value={ing.amount}
							/>
						</div>
					))}
					<Button type="button" onClick={this.addIngredient} color="primary" style={{marginBottom: '10px'}}>
						Add ingredient
					</Button>

					<FormElement
						required
						type="textarea"
						propertyName="recipe"
						title="Recipe"
						placeholder="Enter recipe"
						onChange={this.inputChangeHandler}
						value={this.state.recipe}
					/>

					<Button type="submit" color="primary">
						Save
					</Button>
				</Form>
			</>
		);
	}
}

export default CocktailForm;

