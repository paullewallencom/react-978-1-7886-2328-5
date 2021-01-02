import React from "react";

import { storiesOf } from "@storybook/react";

import { Post } from "../src/components/Post";

storiesOf("Post", module)
    .add("with post one", () => (
        <Post
            post={{
                title: "Post One",
                content: "Post one content",
                author: "Divyendu"
            }}
        />
    ))
    .add("with post two", () => (
        <Post
            post={{
                title: "Post Two with a Much Longer Title",
                content: "Post Two content",
                author: "Divyendu"
            }}
        />
    ));
