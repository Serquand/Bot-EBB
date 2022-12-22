import { Dialect, Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_Name as string, process.env.DB_User as string, process.env.DB_Pwd as string, {
    host: process.env.DB_Host  as string,
    dialect: process.env.DB_Dialect as Dialect,
    logging: false
})

export default sequelize;