const User = require("./User")

const setup = () => User.sync({ force: true })

module.exports = setup