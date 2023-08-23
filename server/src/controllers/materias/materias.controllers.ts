import {Request, Response, request, response} from "express";
import MateriasModel from "../../models/Materias/Materias.db"
import validatedToken from "../../utils/validateToken";


async function CreateMaterias(req: Request, res: Response){
    const {token} = req.headers

    const vtoken = validatedToken(token)
    if(!vtoken) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const {nombre, descripcion} = req.body

    if (!nombre || !descripcion){
        return res.json({status: false, message: 'Debes rellenar todos los datos'})
    }

    const GetMaterias = await MateriasModel.findOne({
        where:{
            nombre
        }
    })

    if(GetMaterias){
        return res.json({status: 500, message: 'Esta materia ya existe'})
    }

    const CreateMaterias: any = await MateriasModel.create({
        nombre,
        descripcion
    })

    if(!CreateMaterias){
        return res.json({status: 404})
    }

    return res.status(200).json({status: true, CreateMaterias})

}

async function UpdateMaterias(req: Request, res: Response){
    const {token} = req.headers

    const vtoken = await validatedToken(token)

    if(!vtoken) return res.status(401).json({message: 'Unauthorized'})

    const {materiasid, nombre, descripcion, enabled} = req.body

    if(!materiasid) return res.status(500).json({message: 'Materias ID not found'})

    const findMaterias = await MateriasModel.findOne({
        where: {
            id:materiasid
        }
    })
    if(!findMaterias) return res.status(404).json({message: 'Carrera not found'})

    await findMaterias.update({
        nombre,
        descripcion,
        enabled
    })

}


export{
    CreateMaterias,
    UpdateMaterias
}