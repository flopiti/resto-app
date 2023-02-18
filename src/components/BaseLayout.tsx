
import styles from '../../styles/styles.module.css';

const BaseLayout = ({ children } : any) => {
    return (
        <div className={styles.baseLayout}>
            {children}
        </div>
    );
    };

export default BaseLayout;
