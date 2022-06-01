import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import ListItemSeparator from "../app/components/ListItemSeparator";

describe("Testing ListItemSeparator Component ", () => {
  const wrapper = renderer.create(<ListItemSeparator />);
  it("should render correctly", () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe("<ListItemSeparator />", () => {
  let tree;
  it("should render correctly", async () => {
    tree = renderer.create(<ListItemSeparator />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
