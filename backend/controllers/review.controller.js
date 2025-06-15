import { Review } from "../models/review.model.js";
import { Charger } from "../models/product.model.js";

// controller for creating a review.
export const writeReview = async (req, res) => {
    try {
        // Get the model data from the body
        const { comment, rating, product } = req.body;
        // const userId = req.id;
        // Create the review
        const review = await Review.create({
            comment,
            rating,
            product,
            // user: userId,
        });

        // Update the product to include the new review
        await Charger.findByIdAndUpdate(product, {
            $push: { review: review._id }
        });

        // return the review in response with success msg
        return res.status(201).json({
            message: "Review created successfully",
            review,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

// Controller for get all reviews
export const getAllReviews = async (req, res) => {
    try {
        // Get all reviews from the database and populate user
        const reviews = await Review.find();
        // ##  POPULATE USER AND CHARGER LATER ##
        // .populate("User", "name")
        // .populate("Charger");
        // if not received, return the error msg
        if (!reviews) {
            return res.status(404).json({
                message: "No reviews found",
                success: false,
            });
        }
        // if everything ok, return the response
        return res.status(200).json({
            message: "Reviews retrieved successfully",
            reviews,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getReviewById = async (req, res) => {
    try {
        // request the id from params
        const { id } = req.params;
        // populate user, charger, to the review and find by id.
        // deselect password while populating user
        const review = await Review.findById(id);
        // .select("-password")
        // .populate("User", "name")
        // .populate("Charger");
        // if not found, return error
        if (!review) {
            return res.status(404).json({
                message: "Review not found",
                success: false,
            });
        }
        // if found, return review.
        return res.status(200).json({
            message: "Review retrieved successfully",
            review,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getReviewByProduct = async (req, res) => {
    try {
        // request the id
        const productId = req.params.id;
        // find the review using product id and deselect the product
        const reviews = await Review.find({ product: productId }).select(
            "-product"
        );

        if (!reviews) {
            return res.status(404).json({
                message: "No reviews found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Reviews retrieved successfully",
            reviews,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateReview = async (req, res) => {
    try {
        // request comment and rating from the body
        const { comment, rating } = req.body;
        const { id } = req.params;
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found",
                success: false,
            });
        }
        // make a new object
        const updateReview = { comment, rating };
        // pass the object into the function
        const updatedReview = await Review.findByIdAndUpdate(id, updateReview, {
            new: true,
        });

        return res.status(201).json({
            message: "Review updated successfully",
            updatedReview,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Review deleted successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
        
    }
}