import { Router } from "express";
import { CreateCarreras, UpdateCarr } from "../../controllers/carreras/carreras.controllers";

const router = Router()

router.post('/', CreateCarreras)
router.post('/update', UpdateCarr)


export default router