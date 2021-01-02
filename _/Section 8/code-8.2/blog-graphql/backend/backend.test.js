const { graphql, GraphQLSchema } = require("graphql");
const Query = require("./src/types/Query");
const Mutation = require("./src/types/Mutation");

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

describe("Check Authentication Workflow", () => {
    it("should test create user mutation", async () => {
        const mutation = `
        mutation CreateUser {
            createUser(input: {fullname: "Divu", username: "divu", password: "divu"}) {
              message
            }
          }      
        `;

        const result = await graphql(schema, mutation);
        const { data } = result;

        expect(data.createUser.message).toBe("Success");
    });

    it("should test login user mutation", async () => {
        const mutation = `
        mutation LoginUser {
            loginUser(input: {username: "divu", password: "divu"}) {
              user {
                id
                fullname
                username
              }
            }
          }
        `;

        const result = await graphql(schema, mutation);
        const { data } = result;

        expect(data.loginUser.user.fullname).toBe("divu");
    });
});
