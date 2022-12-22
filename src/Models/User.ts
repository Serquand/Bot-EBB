import { DataTypes } from "sequelize";
import sequelize from "./Connection";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING, 
        allowNull: false, 
        primaryKey: true, 
        unique: true
    }, 

    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    nbWarn: {
        type: DataTypes.INTEGER, 
        defaultValue: 0, 
    }, 

    nbMessage: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
    }, 

    experience: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
    }
}, {
    timestamps: false,
    modelName: "Users",
    tableName: 'Users',
});

export default User;