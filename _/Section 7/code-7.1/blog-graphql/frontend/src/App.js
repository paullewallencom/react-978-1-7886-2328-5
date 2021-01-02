import React, { Component } from "react";
import ListPage from "./components/ListPage";

import { QueryRenderer, graphql } from "react-relay";
import environment from "./Environment";

const AppAllPostQuery = graphql`
    query AppAllPostQuery($count: Int!, $after: String) {
        viewer {
            ...ListPage_viewer
        }
    }
`;

class App extends Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={AppAllPostQuery}
                variables={{
                    count: 1
                }}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    } else if (props) {
                        return <ListPage viewer={props.viewer} />;
                    }
                    return <div>Loading</div>;
                }}
            />
        );
    }
}

export default App;
