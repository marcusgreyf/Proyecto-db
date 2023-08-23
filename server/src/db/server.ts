import express, { Application } from 'express'
import cors from 'cors'
import db from './database'

//importamos rutas
import userRouter from '../routes/User/user.routes'
import roles from '../routes/Roles/roles.routes'
import perms from '../routes/Perms/perms.routes'
import materias from '../routes/Materias/materias.routes'
import carreras from '../routes/Carrera/carreras.routes'
import examenes from '../routes/Examenes/examenes.routes'
import listac from '../routes/ListaC/listac.routes' 

export default class Server {
    public readonly app: Application
    private readonly port: string

    private readonly apiPaths = {
        user: '/api/user',
        roles: '/api/roles',
        perms: '/api/perms',
        materias: '/api/materias',
        carreras: '/api/carreras',
        examenes: '/api/examenes', 
        listac: '/api/listac'
    }
    constructor() {
        this.app = express()
        this.port = process.env.PORT || '5000'
        //metodos iniciales
        this.middlewares()
        this.routers()
        this.connectiondb()
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`this server is running in port: ${this.port}`)
        })
    }
    routers() {
        this.app.use(this.apiPaths.user, userRouter)
        this.app.use(this.apiPaths.roles, roles)
        this.app.use(this.apiPaths.perms, perms)
        this.app.use(this.apiPaths.materias, materias)
        this.app.use(this.apiPaths.carreras, carreras)
        this.app.use(this.apiPaths.examenes, examenes)
        this.app.use(this.apiPaths.listac, listac)

    }

    //Conexión a base de datos

    async connectiondb() {
        try {
            await db.authenticate()
            await db.sync({ alter: true })
            console.log('La base de datos se conectó correctamente')
        } catch (error) {
            throw new Error(`Error al conectar a la base de datos ${error}`)

        }
    }

}