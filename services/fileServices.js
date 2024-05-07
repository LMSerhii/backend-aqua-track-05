import Jimp from "jimp";
import fs from "fs/promises";

export const updateImage = async (path) => {
  const image = await Jimp.read(path);
  image.resize(250, 250);

  image.write(path);
};

export const removeImage = (tempUpload, destUpload) =>
  fs.rename(tempUpload, destUpload);
