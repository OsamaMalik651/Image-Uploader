const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
var cors = require('cors')
const multer = require('multer');
const {
    ref,
    uploadBytes,
    getDownloadURL
} = require("firebase/storage");

const storage = require("./firebase");
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.post("/api/image-upload", upload.single("image"), async function (req, res) {
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    await uploadBytes(imageRef, file.buffer, metatype)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                res.send(downloadURL)
            })
        })
        .catch((error) => console.log(error.message));
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Image Uploader listening on ${port}`);
