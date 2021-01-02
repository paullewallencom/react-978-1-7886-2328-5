import React from "react";
import Post from "./Post";
import { createFragmentContainer, graphql } from "react-relay";
import { Link } from "react-router-dom";

class ListPage extends React.Component {
    render() {
        return (
            <div style={styles.listPageWrapper}>
                <Link style={styles.postButtonWrapper} to="/create-post">
                    + New Post
                </Link>
                <div style={{ marginTop: 20 }}>
                    {this.props.viewer.allPosts.edges.map(({ node }) => (
                        <Post key={node.__id} post={node} />
                    ))}
                </div>
            </div>
        );
    }
}

const styles = {
    listPageWrapper: { marginTop: 20, textAlign: "center" },
    postButtonWrapper: {
        padding: 10,
        background: "white",
        border: "2px solid indianred",
        color: "indianred",
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10
    }
};

export default createFragmentContainer(
    ListPage,
    graphql`
        fragment ListPage_viewer on Viewer {
            allPosts(last: 100)
                @connection(key: "ListPage_allPosts", filters: []) {
                edges {
                    node {
                        ...Post_post
                    }
                }
            }
        }
    `
);
