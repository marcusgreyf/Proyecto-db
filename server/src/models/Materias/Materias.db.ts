import sequelize, {DataTypes} from 'sequelize'
import db from '../../db/database'


const MateriasModel = db.define('materias', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})

export default MateriasModel 