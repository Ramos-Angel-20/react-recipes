import styles from './FoodCard.module.css';

const FoodCard = props => {

    return (
        <div className={styles.card}>
            <div className={styles['card__image-field']}>
                <img src={props.imagePath} alt={props.title}/>
            </div>
            <div className={styles['card__title-field']}>
                <p>{props.title}</p>
            </div>
            <div className={styles['card__actions']}>
                <button onClick={() => props.getRecipeFn(props.id, props.title)}>View recipe</button>
            </div>
        </div>
    );
}

export default FoodCard;