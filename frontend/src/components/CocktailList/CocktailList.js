import React from 'react';
import {Button, Card, CardBody} from "reactstrap";
import Thumbnail from "../Thumbnail/Thumbnail";
import {Link} from "react-router-dom";
import ShowTo from "../../hoc/ShowTo";

const CocktailList = props => {
	return (
		<Card style={{marginTop: '10px'}}>
			<CardBody>
				<Link to={"/cocktails/" + props.id} style={{textDecoration: 'none', color: 'black'}}>
					<Thumbnail image={props.image}/>
					<h4 style={{marginTop: '10px', marginBottom: '10px'}}><strong>Title: </strong>{props.title}</h4>
					<p style={{marginTop: '18px'}}><strong>Recipe: </strong>{props.recipe}</p>
					<p><strong>Ingredients: </strong>{props.ingredients}</p>
				</Link>
				<ShowTo role='admin'>
					<Button
						type="submit"
						color="primary"
						style={{width: '30%'}}
						onClick={props.delete}
					>
						Delete
					</Button>

					{!props.published &&
					<Button
						type="submit"
						color="primary"
						style={{marginLeft: '20px', width: '30%'}}
						onClick={props.publish}
					>
						Publish
					</Button>
					}
				</ShowTo>
			</CardBody>
		</Card>
	);
};

export default CocktailList;