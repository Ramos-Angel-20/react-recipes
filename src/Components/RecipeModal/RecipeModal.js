import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

import styles from './RecipeModal.module.css';
import Loader from '../UI/Loader';

import { getRecipe } from '../../Services/apiService';

// Backdrop component.
const Backdrop = props => <div className={styles.backdrop} style={{ display: props.showing ? 'block' : 'none' }} onClick={props.closeModalFn}></div>

// Recipe Modal component.
const RecipeModalOverlay = props => {

    let recipeSteps;
    
    const [recipe, setRecipe] = useState([]);
    const [loadError, setLoadError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const loadRecipe = id => {
        // En cada request volvemos a setear el loader a true para que se vea la animación.
        // recipeSteps = null;
        setIsLoading(true);
        getRecipe(id)
            .then(data => {
                if (data[0] !== undefined) {
                    setRecipe(data[0].steps);
                    // Cuando se carga cambia el estado.
                    setIsLoading(false);
                    console.log(data[0].steps);
                } else {

                    setLoadError('Theres no recipe available for this item :(');
                    // Cuando se carga cambia el estado.
                    setIsLoading(false);

                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        /*
            Como el componente se monta inmediatamente al iniciar la aplicación, llamamos a
            useEffect pero sin un currId, esto hace que llamamos a la API de forma innecesaria,
            para evitar esto comprobamos si es que tenemos el props.currId, solo lo tendremos 
            cuando clickemos en un FoodCard, llamamos a useEffect cada que showing cambie, por eso
            lo agregamos al arreglo de dependencias.
        */
        if (props.currId) {
            loadRecipe(props.currId);
            return () => {
                setRecipe([]);
                recipeSteps = null;
            };
        }
    }, [props.showing, props.currId]);

    if (isLoading === false) {
        recipeSteps = recipe.map(step => <li key={step.number}>{step.step}</li>);
        // if (recipeSteps === []){}
    }

    return (
        <div className={styles.modal} style={{ transform: props.showing ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.showing ? '1' : '0' }}>
            <FaTimes className={styles['close-icon']} onClick={props.closeModalFn}/>
            <h3>{props.currTitle}</h3>
            {isLoading ? <Loader color='black' /> : recipeSteps}
            {(loadError && !isLoading)? <p>Theres no recipe available for this item.</p> : null}
        </div>
    );
}

const RecipeModal = props => {
    return (
        <div>
            {ReactDOM.createPortal(<Backdrop showing={props.showing} closeModalFn={props.closeFn} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<RecipeModalOverlay showing={props.showing} currTitle={props.currTitle} currId={props.currId} closeModalFn={props.closeFn}/>, document.getElementById('modal-root'))}
        </div>
    )
}

export default RecipeModal;