import React from 'react';

import {Route, Switch} from "react-router-dom";

import Login from "./containers/Login/Login";
import Cocktails from "./containers/Cocktails/Cocktails";
import SingleCocktail from "./containers/SingleCocktail/SingleCocktail";
import NewCocktail from "./containers/NewCocktail/NewCocktail";
import UserCocktails from "./containers/UserCocktails/UserCocktails";


const Routes = () => {
	return (
		<Switch>
			<Route path="/" exact component={Cocktails}/>
			<Route path="/cocktails/new" exact component={NewCocktail} />
			<Route path="/cocktails/myCocktails" exact component={UserCocktails}/>
			<Route path="/cocktails/:id" exact component={SingleCocktail}/>
			<Route path="/login" exact component={Login} />
		</Switch>
	);
};

export default Routes;