import { Request, Response, request, response } from "express";
import PermissionModel from "../../models/Permisos/Permission.db";
import validatedToken from "../../utils/validateToken";

async function CreatePerms(req: Request, res: Response) {
    const { token } = req.headers


    const vtoken = validatedToken(token)
    if (!vtoken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const { tipo, nivel, rol } = req.body

    if (!tipo || !nivel || !rol) {
        return res.json({ status: false, message: 'Debes rellenar todos los datos' })
    }

    const getPerms = await PermissionModel.findOne({
        where: {
            tipo,
            rol
        }
    })
    if (getPerms) {
        return res.json({ status: 500, message: 'Este permiso ya existe' })
    }

    const createPerms: any = await PermissionModel.create({
        tipo,
        rol,
        nivel
    })
    if (!createPerms) {
        return res.json({ status: 404 })
    }

    return res.status(200).json({ status: true, CreatePerms })
}

async function UpdatePerms(req: Request, res: Response) {
    const { token } = req.headers

    const vtoken = await validatedToken(token)

    if (!vtoken) return res.status(401).json({ message: 'Unauthorized' })

    const { permsid, tipo, nivel, rol } = req.body

    if (!permsid) return res.status(500).json({ message: 'Permission ID not found.' })

    const findPerms = await PermissionModel.findOne({
        where: {
            id: permsid
        }
    })

    if (!findPerms) return res.status(404).json({ message: 'Permission not found' })

    await findPerms.update({
        tipo,
        nivel,
        rol
    }).then((perms) => { perms.save() }).catch((error) => { console.error(error) })

    return res.status(200).json({ message: 'Permiso actualizado correctamente' })
}

export {
    CreatePerms,
    UpdatePerms
}