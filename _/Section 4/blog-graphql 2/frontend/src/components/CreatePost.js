import React from "react";
import { withRouter } from "react-router-dom";

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: ""
        };
    }

    render() {
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
                    <button style={styles.postButtonWrapper}>Post</button>
                )}
            </div>
        );
    }
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
