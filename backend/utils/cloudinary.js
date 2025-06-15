import { v2 as cloudinary } from "cloudinary"

export const uploadImage = async (buffer, filename) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        const base64 = `data:image/${filename.split('.').pop()};base64,${buffer.toString("base64")}`;
        const res = await cloudinary.uploader.upload(base64, {
            resource_type: "auto",
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = async (publicId) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)
    }
}



