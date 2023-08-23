import sequelize, { DataTypes } from 'sequelize'
import db from '../../db/database'

const ExamenesModel = db.define('examenes', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    notas: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aprobados: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desaprobados: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default ExamenesModel