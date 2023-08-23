import { Router } from "express";
import { CreateRole, UpdateRole } from "../../controllers/roles/roles.controllers"


const router = Router()
router.post('/', CreateRole)
router.post('/update', UpdateRole)


export default router