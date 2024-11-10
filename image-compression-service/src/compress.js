const sharp = require('sharp');

async function compressImage(buffer, quality) {
    return await sharp(buffer)
        .jpeg({ quality: parseInt(quality) })
        .toBuffer();
}

module.exports = { compressImage };
