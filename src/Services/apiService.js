import axios from 'axios';

const SECONDARY_API_KEY = process.env.REACT_APP_API_KEY;

export const getFoodList = async query => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SECONDARY_API_KEY}&query=${query}&number=25`);
        const { data } = response;
        
        if (data.results < 1) {
            throw new Error(`There's no recipes available`);
        }

        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }

        return data.results;
        
    
    } catch (err) {
        console.log(err.message);
        return err.message;
    } 
}

// export const getFoodList = async query => {
//     try {
//         const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SECONDARY_API_KEY}&query=${query}&number=25`);
//         const { data } = response;

//         return data;        
    
//     } catch (err) {
//         console.log(err.message);
//     } 
// }

export const getRecipe = async id => {
    try {
        console.log(id);
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${SECONDARY_API_KEY}`);
        const { data } = response;
        return data;

    } catch (err) {
        console.log(err);
    }
}