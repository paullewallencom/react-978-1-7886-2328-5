import React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import Modal from "react-modal";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render() {
        return (
            <div
                style={styles.postWrapper}
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
                <h3>{this.props.post.title}</h3>
                <Modal contentLabel="Content" isOpen={this.state.isOpen}>
                    By: <div>{this.props.post.author.fullname}</div>
                    <h3>{this.props.post.title}</h3>
                    <div>{this.props.post.content}</div>
                    <button
                        onClick={() => this.setState({ isOpen: false })}
                        style={styles.closeButton}
                    >
                        X
                    </button>
                </Modal>
            </div>
        );
    }
}

const styles = {
    postWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ccc",
        margin: 10,
        cursor: "pointer"
    },
    closeButton: {
        position: "absolute",
        right: 12,
        top: 10,
        border: 0,
        background: "white",
        fontSize: 25,
        color: "gray"
    }
};

export { Post };

export default createFragmentContainer(
    Post,
    graphql`
        fragment Post_post on Post {
            id
            title
            content
            author {
                fullname
            }
        }
    `
);
