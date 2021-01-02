import { commitMutation, graphql } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation LoginUserMutation($input: LoginUserInput!) {
        loginUser(input: $input) {
            user {
                id
                username
                password
                fullname
            }
        }
    }
`;

export default (username, password, callback) => {
    const variables = {
        input: {
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
