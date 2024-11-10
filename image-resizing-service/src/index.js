const express = require('express');
const multer = require('multer');
const { resizeImage } = require('./resize');

const app = express();
const upload = multer();
const cors = require('cors');
app.use(cors());

app.post('/resize', upload.single('image'), async (req, res) => {
    const width = req.body.width || 800;
    const height = req.body.height || 600;
    try {
        const resizedImage = await resizeImage(req.file.buffer, width, height);
        res.type('image/jpeg').send(resizedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3003, () => console.log('Image resizing service running on port 3003'));
