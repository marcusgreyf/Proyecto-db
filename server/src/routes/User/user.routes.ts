import { Router } from "express";
import { deleteuser, getuser, postuser, validateduser, updateuser } from "../../controllers/user/user.controllers";

const router = Router()

router.post('/', postuser)  //creamos la ruta "base"
router.post('/delete', deleteuser) //creamos la ruta delete para el endpoint "user"
router.post('/get', getuser)
router.post('/login', validateduser)
router.post('/update', updateuser)

export default router