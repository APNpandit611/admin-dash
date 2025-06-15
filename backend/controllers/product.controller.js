import { Charger } from "../models/product.model.js";
import {deleteImage, uploadImage} from "../utils/cloudinary.js";

//store charger (product) in the database
export const create = async (req, res) => {
    try {
        // get all the fields from the body
        const {
            title,
            model,
            price,
            stock,
            feature,
            brand,
            description,
            compatibleBrands,
        } = req.body;

        const parsedFeature = JSON.parse(feature);
        const parsedCompatibleBrands = JSON.parse(compatibleBrands);

        if (!title || !model || !price || !stock) {
            return res.status(400).json({
                message: "First 4 all fields are required",
                success: false,
            });
        }

        // Image storing logic goes here.
        const imagesUrl = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const cloudinaryResponse = await uploadImage(
                    file.buffer,
                    file.originalname
                );
                imagesUrl.push(cloudinaryResponse.secure_url);
            }
        }

        // Handle features
        // const featureId = []; // empty array to store feature ids
        // if (feature && feature.length > 0) {
        //     // check if length is feature is provided and is not 0
        //     for (const item of feature) {
        //         //iterate through the feature array
        //         const chargerFeature = await ChargerFeature.create(item);
        //         // featureId.push(chargerFeature._id);
        //         featureId.push(chargerFeature);
        //     }
        // }

        // if everything ok, create the product
        const product = await Charger.create({
            title,
            model,
            price,
            stock,
            feature: parsedFeature,
            brand,
            description,
            images: imagesUrl,
            compatibleBrands: parsedCompatibleBrands,
        });

        // return the json message in response with product
        return res.status(201).json({
            message: "Charger created successfully",
            product,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating product",
        });
    }
};

export const bulk = async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products)) {
            return res.status(400).json({
                message: "invalid data",
                success: false,
            });
        }

        products.forEach((product) => {
            if (
                !product.title ||
                !product.model ||
                !product.price ||
                !product.stock
            ) {
                return res.status(400).json({
                    message: "First 4 fields are required",
                    success: false,
                });
            }
        });

        const bulkProduct = await Charger.insertMany(products);

        return res.status(201).json({
            message: "Bulk Upload Successful",
            data: bulkProduct,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error bulk uploading",
        });
    }
};

// getting all the products
export const getAll = async (req, res) => {
    try {
        // find all the product in the database
        const products = await Charger.find({}).populate("review", "comment rating")
        // .populate(
        //     "feature",
        //     "key value"
        // );

        // if products not found return 404
        if (!products) {
            return res.status(404).json({
                message: "No product found",
                success: false,
            });
        }

        // return the product
        return res.status(200).json({
            message: "All products found",
            products,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching product",
        });
    }
};

// get a specific product with id
export const getById = async (req, res) => {
    try {
        // get the id from the params and destructure it
        const { id } = req.params;

        // find the product
        const product = await Charger.findById(id).populate("review", "comment rating")
        
        
        // .populate(
        //     "feature",
        //     "key value"
        // );

        // if product not found, return the error
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        // if found get the product
        return res.status(200).json({
            message: "Product found",
            product,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching product",
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const {
            title,
            model,
            price,
            stock,
            description,
            brand,
            feature,
            compatibleBrands,
            images
        } = req.body;
        const { id } = req.params; //request the post id
        // const images = req.file; // request the file
        // new image uploading logic goes here
        const parsedFeature = JSON.parse(feature);
        const parsedCompatibleBrands = JSON.parse(compatibleBrands);
        // const parsedImages = JSON.parse(images);
        // const parsedImages = JSON.parse(images)
        // console.log("Images", JSON.parse(images))

        // search for product
        let product = await Charger.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "product not found",
                success: false,
            });
        }

        //update the fields
        if (title) product.title = title;
        if (model) product.model = model;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (description) product.description = description;
        if (brand) product.brand = brand;
        // if (compatibleBrands) product.compatibleBrands = compatibleBrands;
        if (parsedCompatibleBrands && Array.isArray(parsedCompatibleBrands)) {
            product.compatibleBrands = parsedCompatibleBrands;
        }
        // if (image) {
        // } //image uploading logic goes here

        if (parsedFeature && Array.isArray(parsedFeature)) {
            product.feature = [];

            parsedFeature.forEach((f) => {
                product.feature.push(f);
            });
        }
        if (images?.length > 0) {
            product.images = images;
        }
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const cloudinaryResponse = await uploadImage(file.buffer, file.originalname);
                product.images = product.images || [];
                product.images.push(cloudinaryResponse.secure_url);
            }
        }
        

        // if feature and feature lenght is greater than 0
        // if (parsedFeature && Array.isArray(parsedFeature)) {
        //     // map the product.feature product.feature and modify it.
        //     parsedFeature.forEach((f, i) => {
        //         if (product.feature[i]) {
        //             product.feature[i] = { ...product.feature[i], ...f }; // Merge existing feature
        //         } else {
        //             product.feature.push(f); // Add new feature
        //         }
        //     });
        // }
        // update the features
        // if (feature && feature.length > 0) {
        //     for (const item of feature) {
        //         if (item._id) {
        //             // find by id and update
        //             await Charger.findByIdAndUpdate(item._id, item, {
        //                 new: true,
        //             });
        //         }
        //     }
        // }
        // save the product
        await product.save();

        // populate product with feature
        // const updatedProduct = await Charger.findById(id)
        // .populate(
        //     "feature",
        //     "key value"
        // );

        // product = {
        //     title: product.title,
        //     model: product.model,
        //     price: product.price,
        //     description: product.description,
        //     image: product.image,
        //     brand: product.brand,
        //     feature: updatedFeatureId
        // };

        return res.status(200).json({
            message: "Product updated",
            // product: updatedProduct,
            product,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating product",
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        // request the id
        const { id } = req.params;
        // find and delete the product
        const product = await Charger.findById(id)
        if (product.images && product.images.length > 0){
            for (const image of product.images) {
                const publicId = image.split('/').slice(-1)[0].split('.')[0]
                await deleteImage(publicId)
            }
        }
        await Charger.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Product deleted",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error deleting product",
        });
    }
};
