import React, { useState, useRef, useEffect } from 'react';

import styles from './SearchBar.module.css';

import ErrorModal from '../ErrorModal/ErrorModal';

// Regex only for letters.
const reg = /^[a-zA-Z ]*$/;

const SearchBar = props => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState();
    const inputRef = useRef();

    useEffect(() => {
        // Hacemos esto para que al cargar el componente hagamos un focus en el.
        inputRef.current.focus();
    }, []);

    const closeErrorModal = () => {
        setError();
    }

    const clearSearchTerm = () => {
        setSearchTerm('');
    }

    const searchTermChangeHandler = e => {
        setSearchTerm(e.target.value);
    }

    const searchHandler = e => {
        if (e.key === 'Enter') {
            if (searchTerm.length > 0 && reg.test(searchTerm)) {
                props.searchFn(searchTerm);
                clearSearchTerm();
            } else {
                setError({message: 'Dont enter empty or numeric values'});
            }
        }
    }

    return (
        <div className={styles['search-bar']}>
            <input type="text" placeholder="Ej: Chicken" onChange={searchTermChangeHandler} value={searchTerm} onKeyPress={searchHandler} style={{color: 'black'}} ref={inputRef}/>
            {error && <ErrorModal closeFn={closeErrorModal} errorMessage={error}/>}
        </div>

    );

}

export default SearchBar;
