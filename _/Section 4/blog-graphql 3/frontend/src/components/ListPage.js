import React from "react";
import Post from "./Post";

const mockPostData = [
    {
        node: {
            id: "1",
            title: "First Post Title",
            content: "First Post Content"
        }
    },
    {
        node: {
            id: "2",
            title: "Second Post Title",
            content: "Second Post Content"
        }
    }
];

class ListPage extends React.Component {
    render() {
        return (
            <div style={styles.listPageWrapper}>
                <div style={styles.postButtonWrapper}>+ New Post</div>
                <div style={{ marginTop: 20 }}>
                    {mockPostData.map(({ node }) => (
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

export default ListPage;
