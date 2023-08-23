import { Router } from "express";
import { CreateMaterias, UpdateMaterias } from "../../controllers/materias/materias.controllers";

const router = Router()

router.post('/', CreateMaterias)
router.post('/update', UpdateMaterias)

export default router