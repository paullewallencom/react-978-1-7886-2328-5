const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require("graphql");

const { globalIdField, connectionDefinitions } = require("graphql-relay");
const { nodeInterface } = require("../interface/Node");

const Post = new GraphQLObjectType({
    name: "Post",
    description: "Post type definition",
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField(),
        title: {
            type: GraphQLString,
            description: "Title of the post",
            resolve: post => post.title
        },
        content: {
            type: GraphQLString,
            description: "Content of the post",
            resolve: post => post.content
        }
    }
});

const { connectionType: PostConnection } = connectionDefinitions({
    nodeType: Post
});

module.exports = { Post, PostConnection };
