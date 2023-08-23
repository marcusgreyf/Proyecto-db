import sequelize, {DataTypes} from 'sequelize'
import db from '../../db/database'
import CarrerasModel from '../Carreras/Carreras.db'
import UserModel from '../User/User.db'


const ListaCModel = db.define('listac',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
        allowNull: false
    },
    Carrera:{
        type: DataTypes.UUID,
        references:{
            model: CarrerasModel,
            key: 'ID'
        },
        allowNull: false
    },
    User:{
        type: DataTypes.UUID,
        references:{
            model: UserModel,
            key:'ID'
        },
        allowNull: false
    },
    enabled:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default ListaCModel