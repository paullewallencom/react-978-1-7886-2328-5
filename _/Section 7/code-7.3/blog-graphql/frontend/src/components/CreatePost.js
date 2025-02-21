import React from "react";
import CreatePostMutation from "../mutations/CreatePostMutation";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../Environment";
import { withRouter } from "react-router-dom";

const CreatePostViewerQuery = graphql`
    query CreatePostViewerQuery {
        viewer {
            id
        }
    }
`;

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            user: null
        };

        this._handlePost = this._handlePost.bind(this);
    }

    componentDidMount() {
        const user = localStorage.getItem("User");
        if (user) {
            this.setState({ user: JSON.parse(user) });
        } else {
            window.location.href = "/";
        }
    }

    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={CreatePostViewerQuery}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    } else if (props) {
                        return (
                            <div style={styles.createPostWrapper}>
                                <input
                                    style={styles.titleWrapper}
                                    value={this.state.title}
                                    placeholder="Title"
                                    onChange={e =>
                                        this.setState({
                                            title: e.target.value
                                        })}
                                />
                                <textarea
                                    style={styles.contentWrapper}
                                    value={this.state.content}
                                    placeholder="Content"
                                    onChange={e =>
                                        this.setState({
                                            content: e.target.value
                                        })}
                                />

                                {this.state.title &&
                                    this.state.content && (
                                        <button
                                            style={styles.postButtonWrapper}
                                            onClick={() =>
                                                this._handlePost(
                                                    props.viewer.id
                                                )}
                                        >
                                            Post
                                        </button>
                                    )}
                            </div>
                        );
                    }
                    return <div>Loading</div>;
                }}
            />
        );
    }

    _handlePost = viewerId => {
        const { title, content } = this.state;
        CreatePostMutation(title, content, this.state.user.id, viewerId, () => {
            this.props.history.push("/");
        });
    };
}

const styles = {
    createPostWrapper: { margin: 30, textAlign: "center" },
    titleWrapper: {
        display: "block",
        width: "100%",
        textAlign: "center",
        fontSize: "30px",
        border: "none",
        outlineWidth: 0
    },
    contentWrapper: {
        width: "100%",
        height: "500px",
        fontSize: "20px",
        marginTop: "20px"
    },
    postButtonWrapper: {
        padding: 10,
        background: "white",
        border: "2px solid indianred",
        color: "indianred",
        borderRadius: 6
    }
};

export default withRouter(CreatePost);
