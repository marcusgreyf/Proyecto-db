import {Request, Response, request, response} from "express";
import CarrerasModel from "../../models/Carreras/Carreras.db"
import validatedToken from "../../utils/validateToken";
import PermissionModel from "../../models/Permisos/Permission.db";

async function CreateCarreras(req: Request, res: Response){
    const {token} = req.headers

    const vtoken = validatedToken(token)
    if(!vtoken) {
        return res.status(401).json({message: 'unauthorized'})
    }

    const {nombre, descripcion} = req.body

    if (!nombre || !descripcion){
        return res.json({status: false, message: 'Debes rellenar todos los datos'})
    }

    const GetCarreras = await CarrerasModel.findOne({
        where:{
            nombre
        }
    })
    if (GetCarreras){
        return res.json({status: 500, message: 'Esta carrera ya existe'})
    }

    const CreateCarreras: any = await CarrerasModel.create({
        nombre,
        descripcion
        
    })

    if(!CreateCarreras){
        return res.json({status: 404})
    }

    return res.status(200).json({status: true, CreateCarreras})
}

async function UpdateCarr(req: Request, res:Response){
    const {token} = req.headers
    
    const vtoken = await validatedToken(token)

    if(!vtoken) return res.status(401).json({message: 'Unauthorized'})

    const {carrerasid, nombre, descripcion, enabled} = req.body

    if (!carrerasid) return res.status(500).json({message: 'Carrera ID not found.'})

    const findCarreras = await PermissionModel.findOne({
        where: {
            id:carrerasid
        }
    })

    if(!findCarreras) return res.status(404).json({message: 'Carrera not found'})

    await findCarreras.update({
        nombre,
        descripcion,
        enabled
    })

}

export{
    CreateCarreras,
    UpdateCarr
}