import User from "./User"

const setup = async () => await User.sync();

export default setup