const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(fileBuffer, fileName) {
  try {
    const file = await toFile(fileBuffer, fileName);
    
    const result = await imagekit.files.upload({
      file: file,
      fileName: fileName,
      folder: "/food"
    });

    return {
      url: result.url,
      fileId: result.fileId
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
}

module.exports = {
  uploadFile
};
