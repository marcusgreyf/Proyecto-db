import {Request, Response, request, response} from "express";
import ListaCModel from "../../models/ListaC/ListaC.db";
import validatedToken from "../../utils/validateToken";

async function InscribitedListaC(req: Request, res: Response){
    const {token} = req.headers

    const vtoken = validatedToken(token)
    if(!vtoken){
        return res.status(401).json({message: 'Unauthorized'})
    }

    const {Carrera} = req.body

    const validateRegistration = await ListaCModel.findOne({
        where: {
            id: vtoken.id
        }
    })
    
    if(validateRegistration){
        return res.json({status:false, message: 'Este alumno ya está en la lista'})
    }

    const CreateRegistration: any = ListaCModel.create({
        Carrera,
        User: vtoken.id
    })

    if(!CreateRegistration){
        return res.json({status:404})
    }
    return res.status(200).json({status:true, CreateRegistration})
}


export {
    InscribitedListaC
}