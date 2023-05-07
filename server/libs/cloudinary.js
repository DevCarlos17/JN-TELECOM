import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: "dj4mwkltq",
  api_key: "176795588184828",
  api_secret: "58x3bRSBM8tuXf6O5fFSqWAvnxE"
})

export const updaloadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "internet"
  })
}

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id)
}