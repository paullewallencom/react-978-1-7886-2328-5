import { commitMutation, graphql } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation CreateUserMutation(
        $createUserInput: CreateUserInput!
        $loginUserInput: LoginUserInput!
    ) {
        createUser(input: $createUserInput) {
            message
        }
        loginUser(input: $loginUserInput) {
            user {
                id
                username
                password
                fullname
            }
        }
    }
`;

export default (username, password, fullname, callback) => {
    const variables = {
        createUserInput: {
            username,
            password,
            fullname,
            clientMutationId: ""
        },
        loginUserInput: {
            username,
            password,
            clientMutationId: ""
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: response => {
            callback(response.loginUser.user);
        },
        onError: err => console.error(err)
    });
};
