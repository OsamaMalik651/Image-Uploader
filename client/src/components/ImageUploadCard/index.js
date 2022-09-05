import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { ReactComponent as ImagePlaceholder } from "../../assets/image.svg"
import { FileUploader } from 'react-drag-drop-files';
import LoadinCard from '../LoadingCard';
import uploadImage from '../../services/UploadImage';
import ImageUploadedCard from '../ImageUploadedCard';

const ImageUploadCard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [downloadURL, setDownloadURL] = useState("")
    const [loading, setLoading] = useState(false)
    const fileTypes = ["JPG", "PNG", "GIF"];

    const dragDropChangeHandler = (files) => {
        setSelectedFile(files);
        setIsFilePicked(true);
    };
    const inputButtonChangeHandler = (event) => {
        if (!isFilePicked) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
        }
    };

    useEffect(() => {
        setSelectedFile(null);
        setPreviewImageUrl("");
        setIsFilePicked(false);
        setDownloadURL("")
    }, [])

    useEffect(() => {
        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setPreviewImageUrl(imageURL);
        }
    }, [selectedFile])

    useEffect(() => {
        if (isFilePicked) {
            setLoading(true)
            uploadImage(selectedFile).then((response) => {
                setDownloadURL(response)
                setLoading(false)
            })
        }
    }, [isFilePicked])

    if (loading) return <div className={styles.ImageUploadCard}> <LoadinCard /></div>

    return (
        <div className={styles.ImageUploadCard}>
            {previewImageUrl.length === 0 ? <div className={styles.UploadCard}>
                <h1>Upload your image</h1>
                <p>File should be Jpeg, Png.</p>
                <div className={styles.uploadSection}>
                    {!isFilePicked ? <FileUploader
                        handleChange={dragDropChangeHandler}
                        name="file"
                        label="Drop files here"
                        types={fileTypes}
                    > <div className={styles.Placeholder}>
                            <ImagePlaceholder />
                            <p>Drag & Drop your image here</p>

                        </div>
                    </FileUploader> : <>
                        <img id="output" src={previewImageUrl} alt="" className={styles.DisplayImage} />
                    </>}
                </div>
                <span>Or</span>
                <label htmlFor='file'>Choose a File</label>
                <input
                    id='file'
                    type="file"
                    name='file'
                    onChange={(e) => inputButtonChangeHandler(e)}
                />
            </div> : <ImageUploadedCard ImageURL={downloadURL} />}

        </div>
    )
}

export default ImageUploadCard