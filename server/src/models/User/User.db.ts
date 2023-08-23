import sequelize, { DataTypes } from 'sequelize' 
import db from '../../db/database'
import RolesModel from '../Roles/Roles.db'

const UserModel = db.define('user', {
    id: {
        type: DataTypes.UUID, 
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_de_usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena:{
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.UUID,
        references: {
            model: RolesModel,
            key: 'ID'
        },
        allowNull: false
    },
    enabled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})


// RolesModel.belongsTo(UserModel)

export default UserModel