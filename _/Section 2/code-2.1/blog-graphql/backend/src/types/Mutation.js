const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require("graphql");

const Post = require("./Post");
const PostModel = require("../model/Post");

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation interface for our blog",
    fields: {
        createPost: {
            type: Post,
            args: {
                title: {
                    type: GraphQLString,
                    description: "Title of the post"
                },
                content: {
                    type: GraphQLString,
                    description: "Content of the post"
                }
            },
            resolve: (_, args) => {
                return PostModel.createPost({
                    title: args.title,
                    content: args.content
                });
            }
        }
    }
});

module.exports = Mutation;
