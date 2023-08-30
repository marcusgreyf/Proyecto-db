import sequelize, {DataTypes} from 'sequelize'
import db from '../../db/database'
import CarrerasModel from '../Carreras/Carreras.db'
import MateriasModel from '../Materias/Materias.db'


const ListaMModels = db.define('listam', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    User:{
        type:DataTypes.UUID,
        references:{
            model: CarrerasModel,
            key: 'ID'
        },
        allowNull: false
    },
    Materia:{
        type: DataTypes.UUID,
        references:{
            model:MateriasModel,
            key:'ID'
        },
        allowNull: false
    },
    enabled:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})

export default ListaMModels