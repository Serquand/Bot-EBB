const sequelize = require('./Connexion')
const DataTypes = require("sequelize").DataTypes

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
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
    timestamp: false, 
    sequelize, 
    modelName: "User", 
    tableName: "Users"
})

module.exports = User