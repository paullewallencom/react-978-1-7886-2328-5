const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog-graphql", {
    useMongoClient: true
});

const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: String,
    content: String,
    userId: String
});

const UserModel = require("./User");
const { fromGlobalId } = require("graphql-relay");

var PostModel = mongoose.model("Post", postSchema);

module.exports = {
    getPosts: order => {
        return PostModel.find().sort({ _id: order == "DESC" ? -1 : 1 });
    },
    getPost: id => {
        return PostModel.findOne({ _id: id });
    },
    createPost: post => {
        return PostModel(post).save();
    },
    getPostAuthor: async postId => {
        const post = await module.exports.getPost(postId);
        const { type, id } = fromGlobalId(post.userId);
        if (type == "User") {
            return UserModel.getUser(id);
        } else {
            return null;
        }
    }
};
