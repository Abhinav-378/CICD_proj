const express = require('express');
const multer = require('multer');
const { compressImage } = require('./compress');

const app = express();
const upload = multer();
const cors = require('cors');
app.use(cors());

app.post('/compress', upload.single('image'), async (req, res) => {
    const quality = req.body.quality || 80;
    try {
        const compressedImage = await compressImage(req.file.buffer, quality);
        res.type('image/jpeg').send(compressedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3002, () => console.log('Image compression service running on port 3002'));
