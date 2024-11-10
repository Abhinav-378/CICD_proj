const sharp = require('sharp');

async function convertImage(buffer, format) {
    return await sharp(buffer).toFormat(format).toBuffer();
}

module.exports = { convertImage };
