import React, { useState, useEffect } from 'react';

import './App.css';

import SearchBar from './Components/SearchBar/SearchBar';
import FoodList from './Components/FoodList/FoodList';
import Loader from './Components/UI/Loader';
import ErrorModal from './Components/ErrorModal/ErrorModal';

import { getFoodList } from './Services/apiService';

const App = () => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const closeErrorModal = () => {
    setError();
    loadFoodList('');
  }

  const loadFoodList = query => {
    setLoading(true);
    getFoodList(query)
      .then(data => {
        setFoodList(data.results);
        if (data.results < 1) {
          setError({message: 'Theres no results for this query'})
        }
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadFoodList('');
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Recipes o' Plenty</h1>
      </header>
      <SearchBar searchFn={loadFoodList} />
      {
        loading ? <Loader color='white'/> : <FoodList list={foodList}/> 
      }
      {error && <ErrorModal closeFn={closeErrorModal} errorMessage={error}/>}
    </div>
  );
}

export default App;
