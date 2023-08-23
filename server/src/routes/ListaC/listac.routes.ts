import { Router } from "express";
import { InscribitedListaC } from "../../controllers/listac/listac.controller";


const router = Router()

router.post('/', InscribitedListaC)

export default router