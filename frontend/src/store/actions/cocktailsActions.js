import {push} from "connected-react-router";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_COCKTAILS_FAILURE = 'FETCH_COCKTAILS_FAILURE';

export const FETCH_ALL_COCKTAILS_SUCCESS = 'FETCH_ALL_COCKTAILS_SUCCESS';
export const FETCH_ALL_COCKTAILS_FAILURE = 'FETCH_ALL_COCKTAILS_FAILURE';

export const CREATE_COCKTAIL_SUCCESS = 'CREATE_COCKTAIL_SUCCESS';
export const CREATE_COCKTAIL_FAILURE = 'CREATE_COCKTAIL_FAILURE';

export const FETCH_COCKTAIL_SUCCESS = 'FETCH_COCKTAIL_SUCCESS';
export const FETCH_COCKTAIL_FAILURE = 'FETCH_COCKTAIL_FAILURE';

export const PUBLISH_COCKTAIL_SUCCESS = 'PUBLISH_COCKTAIL_SUCCESS';
export const PUBLISH_COCKTAIL_FAILURE = 'PUBLISH_COCKTAIL_FAILURE';

export const DELETE_COCKTAIL_SUCCESS = 'DELETE_COCKTAIL_SUCCESS';
export const DELETE_COCKTAIL_FAILURE = 'DELETE_COCKTAIL_FAILURE';

export const FETCH_USER_COCKTAILS_SUCCESS = 'FETCH_USER_COCKTAILS_SUCCESS';
export const FETCH_USER_COCKTAILS_FAILURE = 'FETCH_USER_COCKTAILS_FAILURE';

export const fetchCocktailsSuccess = cocktails => ({type: FETCH_COCKTAILS_SUCCESS, cocktails});
export const fetchCocktailsFailure = error => ({type: FETCH_COCKTAILS_FAILURE, error});

export const fetchAllCocktailsSuccess = cocktails => ({type: FETCH_ALL_COCKTAILS_SUCCESS, cocktails});
export const fetchAllCocktailsFailure = error => ({type: FETCH_ALL_COCKTAILS_FAILURE, error});

export const createCocktailSuccess = () => ({type: CREATE_COCKTAIL_SUCCESS});
export const createCocktailFailure = error => ({type: CREATE_COCKTAIL_FAILURE, error});

export const fetchCocktailSuccess = cocktail => ({type: FETCH_COCKTAIL_SUCCESS, cocktail});
export const fetchCocktailFailure = error => ({type: FETCH_COCKTAIL_FAILURE, error});

export const publishCocktailSuccess = () => ({type: PUBLISH_COCKTAIL_SUCCESS});
export const publishCocktailFailure = error => ({type: PUBLISH_COCKTAIL_FAILURE, error});

export const deleteCocktailSuccess = () => ({type: DELETE_COCKTAIL_SUCCESS});
export const deleteCocktailFailure = error => ({type: DELETE_COCKTAIL_FAILURE, error});

export const fetchUserCocktailsSuccess = userCocktails => ({type: FETCH_USER_COCKTAILS_SUCCESS, userCocktails});
export const fetchUserCocktailsFailure = error => ({type: FETCH_USER_COCKTAILS_FAILURE, error});

export const fetchCocktails = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/cocktails');
			dispatch(fetchCocktailsSuccess(response.data));
		} catch (error) {
			dispatch(fetchCocktailsFailure(error));
		}
	}
};

export const fetchAllCocktails = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/cocktails/all');
			dispatch(fetchAllCocktailsSuccess(response.data));
		} catch (error) {
			dispatch(fetchAllCocktailsFailure(error));
		}
	}
};

export const createCocktail = cocktailData => {
	return async (dispatch) => {
		try {
			await axiosApi.post('/cocktails', cocktailData);
			dispatch(createCocktailSuccess());
			toast.success('Ваш коктейль находится на рассмотрении модератора', {
				position: toast.POSITION.TOP_CENTER
			});
			dispatch(push('/'));
		} catch (error) {
			dispatch(createCocktailFailure(error));
		}
	}
};

export const fetchCocktail = id => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/cocktails/' + id);
			dispatch(fetchCocktailSuccess(response.data));
		} catch (error) {
			dispatch(fetchCocktailFailure(error));
		}
	}
};

export const publishCocktail = id => {
	return async (dispatch) => {
		try {
			await axiosApi.post('/cocktails/' + id + '/published');
			dispatch(publishCocktailSuccess());
		} catch (error)  {
			dispatch(publishCocktailFailure(error));
		}
	}
};

export const deleteCocktail = id => {
	return async (dispatch) => {
		try {
			await axiosApi.delete('/cocktails/' + id);
			dispatch(deleteCocktailSuccess());
			dispatch(push('/'));
		} catch (error) {
			dispatch(deleteCocktailFailure(error));
		}
	}
};

export const fetchUserCocktails = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/cocktails/myCocktails');
			dispatch(fetchUserCocktailsSuccess(response.data));
		} catch (error) {
			dispatch(fetchUserCocktailsFailure(error));
		}
	}
};