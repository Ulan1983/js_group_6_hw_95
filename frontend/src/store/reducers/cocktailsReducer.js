import {
	FETCH_ALL_COCKTAILS_FAILURE,
	FETCH_ALL_COCKTAILS_SUCCESS,
	FETCH_COCKTAIL_FAILURE,
	FETCH_COCKTAIL_SUCCESS,
	FETCH_COCKTAILS_FAILURE,
	FETCH_COCKTAILS_SUCCESS, FETCH_USER_COCKTAILS_FAILURE, FETCH_USER_COCKTAILS_SUCCESS
} from "../actions/cocktailsActions";

const initialState = {
	cocktails: [],
	cocktailsError: null,
	userCocktails: [],
	userCocktailsError: null,
	cocktail: null,
	cocktailError: null
};

const cocktailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COCKTAILS_SUCCESS:
			return {...state, cocktails: action.cocktails};
		case FETCH_COCKTAILS_FAILURE:
			return {...state, cocktailsError: action.error};
		case FETCH_ALL_COCKTAILS_SUCCESS:
			return {...state, cocktails: action.cocktails};
		case FETCH_ALL_COCKTAILS_FAILURE:
			return {...state, cocktailsError: action.error};
		case FETCH_COCKTAIL_SUCCESS:
			return {...state, cocktail: action.cocktail};
		case FETCH_COCKTAIL_FAILURE:
			return {...state, cocktailError: action.error};
		case FETCH_USER_COCKTAILS_SUCCESS:
			return {...state, userCocktails: action.userCocktails};
		case FETCH_USER_COCKTAILS_FAILURE:
			return {...state, userCocktailsError: action.error};
		default:
			return state;
	}
};

export default cocktailsReducer;