import { useReducer, useCallback } from 'react';

import { getFoodList } from '../Services/apiService';

const recipesInitialState = {
    list: [],
    error: null,
    pending: true
};

const recipesReducer = (state = recipesInitialState, action) => {
    switch (action.type) {
        case 'START':
            return {
                ...state,
                pending: true
            };

        case 'SUCCESS':
            return {
                ...state,
                pending: false,
                list: action.payload
            };

        case 'HAS_ERROR':
            return {
                pending: false,
                list: [],
                error: action.payload
            };

        default:
            return state;
    }
}

const useRecipes = () => {
    const [listState, dispatch] = useReducer(recipesReducer, recipesInitialState);

    const fetchList = useCallback((searchTerm) => {

        dispatch({ type: 'START' });

        getFoodList(searchTerm)
            .then(data => {
                if (Array.isArray(data)) {
                    /*
                        Usamos los return para que se termine la ejecución de la función y no avance
                        al siguiente dispatch
                    */
                    return dispatch({ type: 'SUCCESS', payload: data });
                }

                return dispatch({ type: 'HAS_ERROR', payload: data });
                
            })
            .catch(err => {
                dispatch({ type: 'HAS_ERROR', payload: err });
            });

    }, []);

    return {
        ...listState,
        fetchList
    };
}

export default useRecipes;