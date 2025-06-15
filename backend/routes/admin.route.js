import express from "express"
import { createAdmin, adminLogin, logout } from "../controllers/user.controller.js"

const route = express.Router()

route.post("/create", createAdmin)
route.post("/login", adminLogin)
route.get("/logout", logout)
// route.get("/verify", verifyToken)

export default route