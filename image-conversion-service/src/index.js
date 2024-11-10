const express = require('express');
const multer = require('multer');
const { convertImage } = require('./convert');

const app = express();
const upload = multer();
const cors = require('cors');
app.use(cors());
app.post('/convert', upload.single('image'), async (req, res) => {
    const format = req.body.format || 'png';
    try {
        const convertedImage = await convertImage(req.file.buffer, format);
        res.type(`image/${format}`).send(convertedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => console.log('Image conversion service running on port 3001'));
