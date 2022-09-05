import React from 'react'
import styles from "./ImageUploadedStyles.module.css";
import { message } from 'antd';
import 'antd/dist/antd.css';
const ImageUploadedCard = ({ ImageURL }) => {
    console.log(ImageURL)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(ImageURL);
        message.success("Link copied succesfully")

    }
    return (
        <div className={styles.ImageUploadCard}>
            <span className="material-symbols-outlined">
                check_circle
            </span>
            <h1>Uploaded Successfully</h1>
            <div className={styles.ImageURL}>
                <img src={ImageURL || ""} alt="" />
            </div>
            <div className={styles.LinkSection}>
                <p>{ImageURL || "https://images.yourdomain.com/photo-1496950866446-325..."}</p>
                <button onClick={handleCopyLink}> CopyLink</button>
            </div>
        </div>
    )
}

export default ImageUploadedCard
