const sharp = require('sharp');

async function resizeImage(buffer, width, height) {
    return await sharp(buffer)
        .resize({ width: parseInt(width), height: parseInt(height) })
        .toBuffer();
}

module.exports = { resizeImage };
