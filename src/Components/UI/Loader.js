import { ImSpinner2 } from "react-icons/im";
import styles from './Loader.module.css';

const Loader = props => {
    return <ImSpinner2 className={styles.spin} style={{color: `${props.color}`}} />
}

export default Loader;