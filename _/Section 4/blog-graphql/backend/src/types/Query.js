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

const Viewer = new GraphQLObjectType({
    name: "Viewer",
    fields: {
        allPosts: {
            type: new GraphQLNonNull(PostConnection),
            args: connectionArgs,
            resolve: (_, args) =>
                connectionFromPromisedArray(PostModel.getPosts(), args)
        },
        id: {
            type: new GraphQLNonNull(GraphQLID),
            args: {},
            resolve: (_, args) => "viewer-fixed"
        }
    }
});

const Query = new GraphQLObjectType({
    name: "Query",
    description: "Query interface for our blog",
    fields: {
        node: nodeField,
        viewer: {
            name: "Viewer",
            description: "Viewer pattern implementation",
            type: new GraphQLNonNull(Viewer),
            resolve: (_, args) => {
                return {};
            }
        }
    }
});

module.exports = Query;
