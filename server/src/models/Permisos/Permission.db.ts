import sequelize, { DataTypes } from 'sequelize'
import db from '../../db/database'
import RolesModel from '../Roles/Roles.db'

const PermissionModel = db.define('permisos', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.UUID,
        references: {
            model: RolesModel,
            key: 'id'
        },
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default PermissionModel
