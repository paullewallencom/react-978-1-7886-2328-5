import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Adapter from "enzyme-adapter-react-15";
import enzyme, { mount } from "enzyme";
import { Post } from "./components/Post";

enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
});

describe("Post Component", () => {
    it("should test Post title", () => {
        const post = {
            id: 1,
            title: "Post One",
            content: "Post one content",
            author: "Divyendu"
        };
        const wrapper = mount(<Post post={post} />);
        const h3 = wrapper.find("h3");
        expect(h3.text()).toBe(post.title);
    });

    it("should test Post content modal open", () => {
        const post = {
            id: 1,
            title: "Post One",
            content: "Post one content",
            author: "Divyendu"
        };
        const wrapper = mount(<Post post={post} />);
        const isOpenPreClick = wrapper.state().isOpen;
        expect(isOpenPreClick).toBe(false);
        wrapper.simulate("click"); // Click should open the Modal
        const isOpenPostClick = wrapper.state().isOpen;
        expect(isOpenPostClick).toBe(true);
    });
});
