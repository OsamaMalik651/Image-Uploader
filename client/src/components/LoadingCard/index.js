import React from 'react'
import styles from "./LoadingCardStyles.module.css"
const LoadinCard = () => {
    return (
        <div className={styles.LoadingCard}>
            <h1>Uploading...</h1>
            <div className={styles.progressBar}>
                <div className={styles.progress}></div>
            </div>
        </div>
    )
}

export default LoadinCard