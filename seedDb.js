const User = require("./models/user-model");

const findAllUsers = async () => {
    try {
        const users = await User.find({})
    } catch (e) {
        console.log(e);
    }
};

// findAllUsers();


const deleteMany = async () => {
    try {
        const users = await User.deleteMany({})
    } catch (e) {
        console.log(e);
    }
};
// deleteMany();



