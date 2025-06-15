import express from "express"
import { bulk, create, deleteProduct, getAll, getById, updateProduct } from "../controllers/product.controller.js"
import isAuth from "../middlewares/auth.js"
import { upload } from "../middlewares/multer.js"
const route = express.Router()

route.post('/create', upload.array('images', 5), isAuth, create)
route.get('/all', getAll)
route.get('/:id', getById)
route.put('/edit/:id', upload.array('images', 5), isAuth, updateProduct)
route.delete('/delete/:id', deleteProduct)
route.post('/bulk', isAuth, bulk)

export default route