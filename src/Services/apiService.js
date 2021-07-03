import axios from 'axios';

const MAIN_API_KEY = '2a2752c773184b5182a221b013dd7377';
const SECONDARY_API_KEY = 'bd603f22cab543f6b86ec002c7f91f3f';

export const getFoodList = async query => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MAIN_API_KEY}&query=${query}&number=25`);
        const { data } = response;

        return data;
    
    } catch (err) {
        console.log(err);
    } 
}

export const getRecipe = async id => {
    try {
        console.log(id);
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${MAIN_API_KEY}`);
        const { data } = response;
        return data;

    } catch (err) {
        console.log(err);
    }
}