const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog-graphql", {
    useMongoClient: true
});

const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: String,
    content: String
});

var PostModel = mongoose.model("Post", postSchema);

module.exports = {
    getPosts: () => {
        return PostModel.find();
    },
    getPost: id => {
        return PostModel.findOne({ _id: id });
    },
    createPost: post => {
        return PostModel(post).save();
    }
};
