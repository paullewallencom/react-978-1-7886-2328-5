import { commitMutation, graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import environment from "../Environment";

let tempID = 0;

const mutation = graphql`
    mutation CreatePostMutation($input: CreatePostInput!) {
        createPost(input: $input) {
            post {
                id
                title
                content
            }
        }
    }
`;

export default (title, content, viewerId, callback) => {
    const variables = {
        input: {
            title,
            content,
            clientMutationId: ""
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        optimisticUpdater: proxyStore => {
            const id = "client:newPost:" + tempID++;
            const newPost = proxyStore.create(id, "Post");
            newPost.setValue(id, "id");
            newPost.setValue(title, "title");
            newPost.setValue(content, "content");
            const viewerProxy = proxyStore.get(viewerId);
            const connection = ConnectionHandler.getConnection(
                viewerProxy,
                "ListPage_allPosts"
            );
            if (connection) {
                ConnectionHandler.insertEdgeAfter(connection, newPost);
            }
        },
        updater: proxyStore => {
            const createPostField = proxyStore.getRootField("createPost");
            const newPost = createPostField.getLinkedRecord("post");
            const viewerProxy = proxyStore.get(viewerId);
            const connection = ConnectionHandler.getConnection(
                viewerProxy,
                "ListPage_allPosts"
            );
            if (connection) {
                ConnectionHandler.insertEdgeAfter(connection, newPost);
            }
        },
        onCompleted: () => {
            callback();
        },
        onError: err => console.error(err)
    });
};
