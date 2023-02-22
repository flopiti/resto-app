
import styles from '../../styles/styles.module.css';

const BaseLayout = ({ children } : any) => {
    return (
        <div>
            <main className={styles.baseLayout}>{children}</main>
        </div>
    );
    };

export default BaseLayout;
