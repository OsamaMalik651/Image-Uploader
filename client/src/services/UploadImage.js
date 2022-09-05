import axios from "axios"

const uploadImage = async (selectedImage) => {
    console.log("function ran")
    // try catch
    const image = new FormData();
    image.append("image", selectedImage)
    const response = await axios.post("http://localhost:5000/api/image-upload", image)
    return response.data
}

export default uploadImage