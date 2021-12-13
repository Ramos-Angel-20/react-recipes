import React, { useState, useEffect } from 'react';

import './App.css';

import SearchBar from './Components/SearchBar/SearchBar';
import FoodList from './Components/FoodList/FoodList';
import Loader from './Components/UI/Loader';
import ErrorModal from './Components/ErrorModal/ErrorModal';
import useFoodList from './hooks/use-recipes';

const App = () => {
  const [error, setError] = useState();
  const { fetchList, list, pending, error: fetchError } = useFoodList();

  const closeErrorModal = () => {
    setError();
    fetchList('');
  }

  useEffect(() => {
    fetchList('');
  }, [fetchList]);

  return (
    <div className="App">
      <header>
        <h1>Recipes o' Plenty</h1>
      </header>
      <SearchBar searchFn={fetchList} />
      {
        pending ? <Loader color='white'/> : <FoodList list={list} fetchError={fetchError}/> 
      }
      {error && <ErrorModal closeFn={closeErrorModal} errorMessage={error}/>}
    </div>
  );
}

export default App;
