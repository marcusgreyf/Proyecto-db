import {Request, Response, request, response} from 'express';
import ListaMModels from '../../models/ListaM/ListaM.db';
import validatedToken from '../../utils/validateToken';

async function InscribitedListaM(req: Request, res: Response){
    const {token} = req.headers

    const vtoken = validatedToken(token)

    if(!vtoken){
        return res.status(401).json({message: 'Unauthorized'})
    }

    const {Materia} = req.body

    const validatedRegistration = await ListaMModels.findOne({
        where:{
            id: vtoken.id
        }
    })

    if(validatedRegistration){
        return res.json({status: false, message: 'Este alumno ya está en la lista'})
    }

    const CreateRegistration: any = ListaMModels.create({
        Materia,
        user: vtoken.id
    })

    if(!CreateRegistration){
        return res.json({status:404})
    }
    return res.status(200).json({status: true, CreateRegistration})
}

export {
    InscribitedListaM
}