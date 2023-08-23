import { Request, Response, request, response } from "express"
import RolesModel from "../../models/Roles/Roles.db"
import validatedToken from "../../utils/validateToken"


async function CreateRole(req: Request, res: Response) {
    const { token } = req.headers

    const vtoken = validatedToken(token)
    if (!vtoken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const { nombre, descripcion } = req.body

    if (!nombre || !descripcion) {
        return res.json({ status: false, message: 'Debes rellenar todos los datos' })
    }

    const getRoles = await RolesModel.findOne({
        where: {
            nombre
        }
    })
    if (getRoles) {
        return res.json({ status: 500, message: 'Este Rol ya existe' })
    }

    const createdroles: any = await RolesModel.create({
        nombre,
        descripcion
    })

    if (!createdroles) {
        return res.json({ status: 404 })
    }

    return res.status(200).json({ status: true, createdroles })

}

async function UpdateRole(req: Request, res: Response) {
    const { token } = req.headers

    const vtoken = await validatedToken(token)

    if (!vtoken) return res.status(401).json({ message: 'Unauthorized' })

    const { roleid, nombre, descripcion, enabled } = req.body

    if (!roleid) return res.status(500).json({message: 'Role id not found.'})

    const findRole = await RolesModel.findOne({
        where: {
            id: roleid
        }
    })

    if (!findRole) return res.status(404).json({ message: 'Role not found' })

    await findRole.update({
        nombre,
        descripcion,
        enabled
    }).then((role) => { role.save() }).catch((error) => { console.error(error) })

    return res.status(200).json({message: 'Role was updated successfully'})

}

export {
    CreateRole,
    UpdateRole
}