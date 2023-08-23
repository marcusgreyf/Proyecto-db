//(nos conectamos al front y al back a través de peticiones) 
import { Request, Response, request, response } from "express"; //Importamos el archivo express y lo destructuramos (typados)
import UserModel from "../../models/User/User.db"; //Imporatmos UserModel del archivo User.db
import bcrypt from "bcrypt" //importamos bcrypt (encriptar contrasñeas)
import jwt from "jsonwebtoken" //importamos jsonwebtoken (generar tokens)
import validatedToken from "../../utils/validateToken"; //llamamos a validateToken del archivo validateToken.ts
import RolesModel from "../../models/Roles/Roles.db";

async function postuser(req: Request, res: Response) { // Creando una función llamada post user que contiene parametros (un tipado es "asignarle un valor y nombre a X cosa") (request es un pedido.) (Request: es lo que envía el cliente y response lo que recibe el cliente)
    const { nombre, apellido, email, nombre_de_usuario, contrasena } = req.body // Destructuramos la información contenida en el req.body
    // console.log(email) <- lo usamos para debugear una wea
    if (!nombre || !apellido || !email || !nombre_de_usuario || !contrasena) { // hacemos un if para comprobar si falta algún dato
        return res.json({ status: false, message: 'Debes rellenar todos los datos' })//mensaje que se le retorna al cliente/usuario en caso de que falte un dato
    }

    const verfUser = await UserModel.findOne({
        where: {
            nombre_de_usuario
        }
    })
    
    if (verfUser){
        return res.json({status: false, message: 'Ya existe un usuario con el siguiente nombre de usuario'})
    }

    try { //intentar hacer el bloque de código
        const salt = await bcrypt.genSalt(10)
        const contraseñaencriptada = await bcrypt.hash(contrasena, salt)
   

        const defaultRole : any = await RolesModel.findOne({
            where: {
                nombre: "Invitado"
            }
        }) 


        const createduser: any = await UserModel.create({ // ejecutas UserModel.create
            nombre, // Le asignamos el valor de la propiedad "nombre"
            apellido,// Le asignamos el valor de la propiedad "apellido"
            email,
            nombre_de_usuario,
            contrasena: contraseñaencriptada, //encriptamos la contraseña
            role: defaultRole.id
        })
        const token = jwt.sign({ id: createduser.id }, process.env.CONTRASENASECRETA) // creamos una constante llamada token = 
     
        return res.status(200).json({ status: true, createduser, token }) //retornamos un código 200 = significa que todo se ejecutó de manera correcta


    } catch (error) { // si el bloque de código no se ejectura esto lo ataja
        console.log(error)// enviamos el error "atajado" a la consola
        return res.status(500).json({ status: false, message: 'Se ocurrió un error al momento de registrar la cuenta' }) //retornamos el código 500 = Error del servidor
    }



    // acá respondemos a la petición
}



async function getuser(req: Request, res: Response) {

    const { token } = req.headers // destructuramos el req.headers
    const vtoken = validatedToken(token) // asignamos valor a la constante vtoken que es igual a validatedToken(token)

    if (!vtoken) { // comprobando que vtoken sea verdadero o falso
        return res.status(401).json({ message: 'Unauthorized' }) //mensaje que retornaremos en caso de que no esté autorizado
    }

    const getUser = await UserModel.findOne({ // Creamos la constante getUser en el cual buscaremos X cosa de un usuario en específico (RECOPILAMOS INFORMACIÓN)
        where: { //buscamos en la parte de ...
            id: vtoken.id // buscamos y especificamos que ID es === a vtoken.id
        }
    })


    if (!getUser) { //obtenemos que si getuser es falso
        return res.json({ status: 404 }) //retornamos un error res.json (404)
    }

    return res.status(200).json({ status: true, getUser })
}



async function validateduser(req: Request, res: Response) {
    const { nombre_de_usuario, contrasena } = req.body

    if (!nombre_de_usuario || !contrasena) {
        return res.json({ status: false, message: 'Los campos estan incompletos' })
    }

    const getUser: any = await UserModel.findOne({
        where: {
            nombre_de_usuario: nombre_de_usuario
        }
    })
    if (!getUser) {
        return res.json({ status: 404 })
    }

    const validatedcontrasena = await bcrypt.compare(contrasena, getUser.contrasena)

    if (!validatedcontrasena) {
        return res.json({ status: false, message: 'Usuario o contraseña incorrectos' })
    }


    const token = jwt.sign({ id: getUser.id }, process.env.CONTRASENASECRETA)

    return res.status(200).json({ status: true, getUser, token })

}



async function updateuser(req: Request, res: Response) {

    const { token } = req.headers

    const vtoken = validatedToken(token)

    if (!vtoken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const getUser: any = await UserModel.findOne({
        where: {
            id: vtoken.id
        }
    })

    if (!getUser) {
        return res.json({ status: 404 })
    }

    const { nombre_de_usuario, contrasena, email, nombre, apellido } = req.body

    if (!nombre_de_usuario || !contrasena || !email || !nombre || !apellido) {
        return res.json({ status: false, message: 'Los campos estan incompletos' })
    }

    const salt = await bcrypt.genSalt(10)
    const contraseñaencriptada = await bcrypt.hash(contrasena, salt)
    const updateinfo: any = await UserModel.update({
        nombre_de_usuario: nombre_de_usuario,
        contrasena: contraseñaencriptada,
        email: email,
        nombre: nombre,
        apellido: apellido,
    },
        {
            where: {
                id: vtoken.id
            }

        })


    if (updateinfo[0] === 0) {
        return res.json({ status: 404 })
    }

    return res.status(200).json({ status: true, updateinfo, token })

}


async function deleteuser(req: Request, res: Response) { //
    const { token } = req.headers
    const vtoken = validatedToken(token)

    if (!vtoken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const getUser = await UserModel.findOne({
        where: {
            id: vtoken.id
        }
    })

    console.log(getUser)
    if (!getUser) {
        return res.json({ status: 404 })
    }

    const deleteuser = await getUser.destroy()

    if (deleteuser[0] === 0) {
        return res.json({ status: 404 })
    }

    return res.status(200).json({status: true, deleteuser, token})
}


export {//
    postuser,//
    deleteuser,//
    getuser,
    validateduser,
    updateuser
}