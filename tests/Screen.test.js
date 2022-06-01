import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import Screen from "../app/components/Screen";

describe("Testing Screen Component", () => {
  const wrapper = renderer.create(<Screen />);
  it("should render", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe("<Screen />", () => {
  let tree;
  it("should render correctly", async () => {
    tree = renderer.create(<Screen />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
