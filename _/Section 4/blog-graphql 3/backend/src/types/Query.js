const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = require("graphql");

const {
    connectionArgs,
    connectionFromPromisedArray
} = require("graphql-relay");

const { nodeField } = require("../interface/Node");
const { Post, PostConnection } = require("./Post");

const PostModel = require("../model/Post");

const Query = new GraphQLObjectType({
    name: "Query",
    description: "Query interface for our blog",
    fields: {
        node: nodeField,
        posts: {
            type: PostConnection,
            args: connectionArgs,
            resolve: (_, args) =>
                connectionFromPromisedArray(PostModel.getPosts(), args)
        }
    }
});

module.exports = Query;
