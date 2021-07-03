import React, { useState } from 'react';
import styles from './FoodList.module.css';

import FoodCard from '../FoodCard/FoodCard';
import RecipeModal from '../RecipeModal/RecipeModal';

const FoodList = props => {
    
    const [modalShowing, setModalShowing] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    const openModalHandler = (id, title) => {
        setCurrentId(id);
        setModalShowing(true);
        setCurrentTitle(title);
    }

    const closeModalHandler = () => {
        setCurrentId(null);
        setModalShowing(false);
        setCurrentTitle(null);
    }

    let food = <p>No Food retrieved</p>;

    if (props.list && props.list.length > 0) {
        food = props.list.map(item =>
            <FoodCard 
                key={item.id} 
                title={item.title} 
                imagePath={item.image} 
                id={item.id} 
                getRecipeFn={openModalHandler}
            />
        );
    }

    return (
        <div className={styles.foodList}>
            {food}
            <RecipeModal showing={modalShowing} currId={currentId} currTitle={currentTitle} closeFn={closeModalHandler}/>
        </div>
    );
}

export default FoodList;