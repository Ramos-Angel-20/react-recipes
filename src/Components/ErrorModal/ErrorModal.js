import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

import styles from './ErrorModal.module.css';

const Backdrop = props => <div onClick={props.closeFn} className={styles['backdrop']}></div>

const ErrorModalOverlay = props => {
    return (
        <div className={styles['error-modal']}>
            <FaTimes className={styles['close-icon']} onClick={props.closeFn}/>
            <h3>Something wen't wrong</h3>
            <p>{props.errorMessage.message}.</p>
        </div>
    );
}

const ErrorModal = props => {
    return (
        <div>
            {ReactDOM.createPortal(<ErrorModalOverlay closeFn={props.closeFn} errorMessage={props.errorMessage}/>, document.getElementById('modal-root'))}
            {ReactDOM.createPortal(<Backdrop closeFn={props.closeFn}/>, document.getElementById('backdrop-root'))}
        </div>
    );
}

export default ErrorModal;