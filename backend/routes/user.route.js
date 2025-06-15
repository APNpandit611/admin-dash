import express from "express"
import { googleLogin } from "../controllers/user.controller.js"

const route = express.Router()

route.post("/google-login", googleLogin)



export default route