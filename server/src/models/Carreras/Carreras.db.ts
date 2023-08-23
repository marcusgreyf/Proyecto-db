import sequelize, { DataTypes } from 'sequelize'
import db from '../../db/database'
import UserModel from '../User/User.db'

const CarrerasModel = db.define('carreras', {
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

export default CarrerasModel