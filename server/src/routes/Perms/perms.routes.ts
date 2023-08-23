import { Router } from "express";
import { CreatePerms, UpdatePerms } from "../../controllers/perms/permission.controllers"


const router = Router()

router.post('/', CreatePerms)
router.post('/update', UpdatePerms)


export default router