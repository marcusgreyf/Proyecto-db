import {Request, Response, request, response } from "express"
import ExamenesModel from "../../models/Examenes/Examenes.db"
import validatedToken from "../../utils/validateToken"


async function CreateExamen(req: Request, res:Response){
    const {token} = req.headers

    const vtoken = validatedToken(token)
    if(!vtoken) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const {notas, aprobados, desaprobados} = req.body

    if (!notas || !desaprobados || !aprobados){
        return res.json({status: false, message: 'Debes rellenar todos los datos'})
    }

    const GetExamenes = await ExamenesModel.findOne({
        where:{
            notas
        }
    })

    if(GetExamenes){
        return res.json({status: 500, message: 'Este examen ya está creado'})
    }

    const CreateExamen: any = await ExamenesModel.create({
        notas,
        aprobados,
        desaprobados
    })

    if(!CreateExamen){
        return res.json({status: 404})
    }

    return res.status(200).json({status: true, CreateExamen})

}

async function UpdateExamen(req: Request, res:Response){
    const {token} = req.headers

    const vtoken = await validatedToken(token)


    if(!vtoken) return res.status(401).json({message: 'Unauthorized'})

    const {examenid, notas, aprobados,desaprobados, enabled} = req.body

    if(!examenid) return res.status(500).json({message: 'Examen ID not found'})

    const findExamen = await ExamenesModel.findOne({
        where:{
            id:examenid
        }
    })

    if(!findExamen) return res.status(404).json({message: 'Examen not found'})
   
    await findExamen.update({
        notas,
        aprobados,
        desaprobados,
        enabled
})
}

export {
    CreateExamen,
    UpdateExamen
}