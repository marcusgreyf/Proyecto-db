import { Router } from "express";
import {CreateExamen, UpdateExamen} from "../../controllers/examenes/examenes.controller";

const router = Router()

router.post('/', CreateExamen)
router.post('/update', UpdateExamen)



export default router