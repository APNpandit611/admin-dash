import express from "express"
import { writeReview, getAllReviews, getReviewById, getReviewByProduct, updateReview } from "../controllers/review.controller.js"


const route = express.Router()

route.post("/write", writeReview)
route.get("/all", getAllReviews)
route.get("/:id", getReviewById)
route.get("/product/:id", getReviewByProduct)
route.put("/edit/:id", updateReview)

export default route