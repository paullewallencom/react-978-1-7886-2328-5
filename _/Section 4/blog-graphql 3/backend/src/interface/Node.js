const { GraphQLInterfaceType, GraphQLNonNull, GraphQLID } = require("graphql");
const { nodeDefinitions, fromGlobalId } = require("graphql-relay");
const PostModel = require("../model/Post");

const { nodeInterface, nodeField } = nodeDefinitions(
    globalId => {
        const { type, id } = fromGlobalId(globalId);
        if (type == "Post") {
            return PostModel.getPost(id);
        } else {
            return null;
        }
    },
    object => {
        const { Post } = require("../types/Post");
        if (object.title) {
            return Post;
        }
        return null;
    }
);

module.exports = { nodeInterface, nodeField };
