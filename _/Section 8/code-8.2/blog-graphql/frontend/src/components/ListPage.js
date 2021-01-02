import React from "react";
import Post from "./Post";
import { createPaginationContainer, graphql } from "react-relay";
import { Link } from "react-router-dom";

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
        this._loadMore = this._loadMore.bind(this);
    }

    componentDidMount() {
        const user = localStorage.getItem("User");
        if (user) {
            this.setState({ user: JSON.parse(user) });
        }
    }

    render() {
        return (
            <div style={styles.listPageWrapper}>
                <Link style={styles.buttonWrapper} to="/create-post">
                    + New Post
                </Link>
                {!this.state.user && (
                    <Link style={styles.buttonWrapper} to="/login">
                        Login
                    </Link>
                )}
                {this.state.user && (
                    <a
                        onClick={() => {
                            localStorage.removeItem("User");
                            window.location.reload();
                        }}
                        style={styles.buttonWrapper}
                    >
                        Logout
                    </a>
                )}
                <div style={{ marginTop: 20 }}>
                    {this.props.viewer.allPosts.edges.map(({ node }) => (
                        <Post key={node.__id} post={node} />
                    ))}
                </div>

                <button
                    style={styles.buttonWrapper}
                    onClick={() => this._loadMore()}
                >
                    Load More
                </button>
            </div>
        );
    }

    _loadMore() {
        if (!this.props.relay.hasMore()) {
            console.log(`Nothing more to load`);
            return;
        } else if (this.props.relay.isLoading()) {
            console.log(`Request is already pending`);
            return;
        }

        this.props.relay.loadMore(1);
    }
}

const styles = {
    listPageWrapper: { marginTop: 20, textAlign: "center" },
    buttonWrapper: {
        padding: 10,
        background: "white",
        border: "2px solid indianred",
        color: "indianred",
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        textDecoration: "underline",
        cursor: "pointer"
    }
};

export default createPaginationContainer(
    ListPage,
    graphql`
        fragment ListPage_viewer on Viewer {
            allPosts(first: $count, after: $after, order: "DESC")
                @connection(key: "ListPage_allPosts", filters: []) {
                edges {
                    node {
                        ...Post_post
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    `,
    {
        direction: "forward",
        query: graphql`
            query ListPageForwardQuery($count: Int!, $after: String) {
                viewer {
                    ...ListPage_viewer
                }
            }
        `,
        getConnectionFromProps(props) {
            return props.viewer && props.viewer.allPosts;
        },
        getFragmentVariables(previousVariables, totalCount) {
            return {
                ...previousVariables,
                count: totalCount
            };
        },
        getVariables(props, paginationInfo, fragmentVariables) {
            return {
                count: paginationInfo.count,
                after: paginationInfo.cursor
            };
        }
    }
);
