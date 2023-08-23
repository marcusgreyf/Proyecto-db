import sequelize, { DataTypes } from 'sequelize'
import db from '../../db/database'
import { AllowNull } from 'sequelize-typescript'
import PermissionModel from '../Permisos/Permission.db'

const RolesModel = db.define('roles', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default RolesModel