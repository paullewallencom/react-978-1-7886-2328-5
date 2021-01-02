const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require("graphql");

const { globalIdField } = require("graphql-relay");
const { nodeInterface } = require("../interface/Node");

const User = new GraphQLObjectType({
    name: "User",
    description: "User type definition",
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField(),
        fullname: {
            type: GraphQLString,
            description: "User Full Name",
            resolve: user => user.fullname
        },
        username: {
            type: GraphQLString,
            description: "User Username",
            resolve: user => user.username
        },
        password: {
            type: GraphQLString,
            description: "User Password",
            resolve: user => user.password
        }
    }
});

module.exports = { User };
