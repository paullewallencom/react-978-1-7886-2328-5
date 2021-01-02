const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog-graphql", {
    useMongoClient: true
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String,
    fullname: String
});

var UserModal = mongoose.model("User", userSchema);

module.exports = {
    getUser: (id, username) => {
        return UserModal.findOne({
            $or: [{ _id: id }, { username: username }]
        });
    },
    loginUser: loginUserInput => {
        const { username, password } = loginUserInput;
        return UserModal.findOne({
            $and: [{ username: username }, { password: password }]
        });
    },
    createUser: user => {
        return UserModal(user).save();
    }
};
