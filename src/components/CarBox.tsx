import styles from '../../styles/styles.module.css';
import Image from 'next/image'

export const CarBox = ({timeInMins}:any) => {
    return (
        <span className={styles.walkingBox}>
                <Image src="/car.png" alt={''} width="64" height="64"/>
                {timeInMins} mins
        </span>
    );
    };